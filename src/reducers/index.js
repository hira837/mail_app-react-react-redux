// reducerの結合
import { combineReducers } from 'redux'
import { reducer as form } from 'redux-form'
import mails from './mails'

export default combineReducers({ mails, form });
