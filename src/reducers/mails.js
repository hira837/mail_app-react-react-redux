import _ from 'lodash'
import { READ_MAILS, DELETE_MAIL, GET_MAIL } from '../actions';

export default (mails = {}, action) => {
  switch(action.type) {
    case READ_MAILS:
      const allMails = _.mapKeys(action.response, "id")
      // console.log(allMails)
      return allMails
    case GET_MAIL:
      const data = action.response.data
      console.log(data)
      return { ...mails, [data.id]: data }
    case DELETE_MAIL:
      console.log(action.id)
      delete mails[action.id]
      return { ...mails }
    default:
      return mails
  }
}