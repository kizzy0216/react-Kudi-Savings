import { combineReducers } from 'redux'
import CustomerPhoneNumber from './customer/reducers/customer-phone-number'
import StashId from "./stash/reducers/stash-id";

const RootReducer = combineReducers({
  CustomerPhoneNumber,
  StashId
})

export default RootReducer
