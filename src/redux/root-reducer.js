import { combineReducers } from 'redux'
import CustomerPhoneNumber from './customer/reducers/customer-phone-number'
import CustomerFilters from './customer/reducers/customer-filter'
import StashId from "./stash/reducers/stash-id";

const RootReducer = combineReducers({
  CustomerPhoneNumber,
  StashId,
  CustomerFilters
})

export default RootReducer
