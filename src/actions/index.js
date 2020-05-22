// import axios from 'axios'

// Action Creator・・・Actionを定義してactionをreturnする関数
export const INCREMENT = "INCREMENT"
export const DECREMENT = "DECREMENT"
export const READ_MAILS = "READ_MAILS"

// Action・・・typeというkeyをもつオブジェクト
export const increment = () => ({
  type: "INCREMENT",
})

export const decrement = () => ({
  type: "DECREMENT",
})

const ROOT_URL = "https://udemy-utils.herokuapp.com/api/v1"
const QUERYSTRING = "?token=token123"
export const readMails = () => async dispatch => {
    const response = await (
      await fetch(`${ROOT_URL}/events${QUERYSTRING}`)
    ).json()
    dispatch({ type: READ_MAILS, response })
}
// コンポーネントで使うのでexportしておく
// 再利用するので(REDUCERで使う)ので変数に格納し、exportしておく
// view側でインポート。あるイベントに対し、これらのアクションを実行して、適切な状態遷移を実行するための仕組み
