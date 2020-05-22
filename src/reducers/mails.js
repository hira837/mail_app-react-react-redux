import _ from 'lodash'
import { READ_MAILS } from '../actions';

export default (mails = {}, action) => {
  switch(action.type) {
    case READ_MAILS:
      const allMails = _.mapKeys(action.response, "id")
      // console.log(allMails)
      return allMails
    default:
      return mails
  }
}