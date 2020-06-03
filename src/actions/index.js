import axios from 'axios'

// Action Creator・・・Actionを定義してactionをreturnする関数
export const READ_MAILS = "READ_MAILS"
export const CREATE_MAIL = "CREATE_MAIL"
export const GET_MAIL = "GET_MAIL"
export const DELETE_MAIL = "DELETE_MAIL"
export const UPDATE_MAIL = "UPDATE_MAIL"
export const SORT_BY_ASC = "SORT_BY_ASC"
export const SORT_BY_DESC = "SORT_BY_DESC"
export const FILTER_BY_DATE = "FILTER_BY_DATE"

// Action・・・typeというkeyをもつオブジェクト
// APIがある場合は指定
const ROOT_URL = "https://udemy-utils.herokuapp.com/api/v1"
const QUERYSTRING = "?token=token123"
export const readMails = () => async dispatch => {
    // const response = await (
    //   await fetch(`${ROOT_URL}/events${QUERYSTRING}`)
    // ).json()
    const response = await ( await fetch('data/allMails.json')).json()
    dispatch({ type: READ_MAILS, response })
}

export const createMails = values => async dispatch => {
  const response = await axios.post(`${ROOT_URL}/events${QUERYSTRING}`, values);
  // const response = await (await fetch(`${ROOT_URL}/events${QUERYSTRING}`, values= {}),{
  //   method: "POST",
  //   contentType: "application/json",
  //   headers: {"Content-Type": "application/json; charset=utf-8"},
  //   body: JSON.stringify(values),
  // }).json();
  dispatch({ type: CREATE_MAIL, response });

  // postData(`${ROOT_URL}/events${QUERYSTRING}`, values)
  //   .then((values) => {
  //     const response = JSON.stringify(values);
  //     console.log(response)
  //     dispatch({ type: CREATE_MAILS, response });
  //   }) 
  //   .catch((error) => console.error(error));

  // function postData(url = ``, data = {}) {
  //   return fetch(url, {
  //     method: "POST", // *GET, POST, PUT, DELETE, etc.
  //     headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //     },
  //     body: JSON.stringify(data), // 本文のデータ型は "Content-Type" ヘッダーと一致する必要があります
  //   }).then((response) => response.json()); // レスポンスの JSON を解析
  // }
}

export const getMail = id => async dispatch => {
  // const response = await axios.get(`${ROOT_URL}/events/${id}${QUERYSTRING}`);
  const response = await (await fetch("data/allMails.json")).json();
  dispatch({ type: GET_MAIL, response });
}

export const deleteMail = id => async dispatch => {
  await axios.delete(`${ROOT_URL}/events/${id}${QUERYSTRING}`);
  dispatch({ type: DELETE_MAIL, id });
}

export const putMail = values => async dispatch => {
  await axios.put(`${ROOT_URL}/events/${values.id}${QUERYSTRING}`, values);
  dispatch({ type: UPDATE_MAIL, values });
}

export const sortByAsc = () => async dispatch => {
  const response = await (await fetch("data/allMails.json")).json()
  dispatch({ type: SORT_BY_ASC, response });
}
export const sortByDesc = () => async dispatch => {
  const response = await (await fetch("data/allMails.json")).json()
  dispatch({ type: SORT_BY_DESC, response });
}

export const filterByDate = (startDate, endDate, validDateRange) => async dispatch => {
  const response = await (await fetch("data/allMails.json")).json()
  dispatch({ type: FILTER_BY_DATE, startDate, endDate, validDateRange, response });
}
