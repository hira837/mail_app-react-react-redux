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
      console.log(data);
      return { ...mails, [data.id]: data };
    case DELETE_MAIL:
      console.log(action.id, "delete reducer");
      delete mails[action.id];
      return { ...mails };
    case SORT_BY_ASC:
      return _.orderBy(action.response, 'date', 'asc')
    case SORT_BY_DESC:
      return _.orderBy(action.response, "date", "desc");
    case FILTER_BY_DATE:
      function filterByJson(item) {
        if(item.date === '2020-05-21') return true
      }
      const filteredData = action.response.filter(filterByJson)
      console.log(filteredData)
      return filteredData
    default:
      return mails;
  }
}