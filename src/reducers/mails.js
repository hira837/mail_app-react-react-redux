import _ from 'lodash'
import { READ_MAILS, DELETE_MAIL, GET_MAIL, UPDATE_MAIL, CREATE_MAIL, SORT_BY_DATE } from '../actions';

export default (mails = {}, action) => {
  switch (action.type) {
    case READ_MAILS:
    case UPDATE_MAIL:
    case CREATE_MAIL:
      const allMails = _.mapKeys(action.response, "id");
      // console.log(allMails)
      return allMails;
    case GET_MAIL:
      const data = action.response.data;
      console.log(data);
      return { ...mails, [data.id]: data };
    case DELETE_MAIL:
      console.log(action.id, "delete reducer");
      delete mails[action.id];
      return { ...mails };
    case SORT_BY_DATE:
      return _.orderBy(action.response, 'date', 'asc')
    default:
      return mails;
  }
}