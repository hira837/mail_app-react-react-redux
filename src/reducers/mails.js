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
      const data = action.response;
      return { ...mails, [data.id]: data };
    case DELETE_MAIL:
      delete mails[action.id];
      return { ...mails };
    case SORT_BY_ASC:
      let dataForAsc
      if (!action.validDateRange.length) {
        dataForAsc = action.response
      } else {
        dataForAsc = action.response.filter((item) => action.validDateRange.includes(item.date))
      }
  
      return _.orderBy(dataForAsc, 'date', 'asc')
    case SORT_BY_DESC:
      let dataForDesc
      if (!action.validDateRange.length) {
        dataForDesc = action.response
      } else {
        dataForDesc = action.response.filter((item) => action.validDateRange.includes(item.date))
      }
      return _.orderBy(dataForDesc, "date", "desc");
    case FILTER_BY_DATE:
      const filteredData = action.response.filter((item) => action.validDateRange.includes(item.date))
      return filteredData
    default:
      return mails;
  }
}