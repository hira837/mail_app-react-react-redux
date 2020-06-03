import _ from 'lodash'
import { READ_MAILS, DELETE_MAIL, GET_MAIL, UPDATE_MAIL, CREATE_MAIL, SORT_BY_ASC, SORT_BY_DESC, FILTER_BY_DATE} from '../actions';

export default (mails = {}, action) => {
  switch (action.type) {
    case READ_MAILS:
    case UPDATE_MAIL:
    case CREATE_MAIL:
      const allMails = _.mapKeys(action.response, "id");
      return allMails;
    case GET_MAIL:
      const data = action.response.data;
      return { ...mails, [data.id]: data };
    case DELETE_MAIL:
      delete mails[action.id];
      return { ...mails };
    case SORT_BY_ASC:
      return _.orderBy(action.response, 'date', 'asc')
    case SORT_BY_DESC:
      return _.orderBy(action.response, "date", "desc");
    case FILTER_BY_DATE:
      // console.log(action.validDateRange)
      // return _.mapKeys(action.response, "id")
      function filterByJson(item) {
        return _.forEach(action.validDateRange, (inputCalendatDate) => {
          if (item.date === inputCalendatDate) {
            console.log(`${item.date}(json) = ${inputCalendatDate}(input)`)
            console.log("true");
            return true;
          } else {
            console.log(`${item.date}(json) != ${inputCalendatDate}(input)`);
            console.log("false")
            // return false
          }
        })
      }
      function filterItems(arr, query) {
        return arr.filter((el) => {
          if(el === query) {
            console.log("true")
            return true
          } else {
            console.log("false")
            // return false
          }
        })
      }
      // const filteredData = filterItems(action.validDateRange, "2020-06-01");
      const filteredData = action.response.filter(filterByJson)
      // const filterItems = action.response.filterItems(action.response, action.validDateRange)
      console.log(filteredData)
      // return filteredData
      return _.mapKeys(action.response, "id");
    default:
      return mails;
  }
}