import { combineReducers } from 'redux'
import CustomerPhoneNumber from './customer/reducers/customer-phone-number'

const RootReducer = combineReducers({
  CustomerPhoneNumber: CustomerPhoneNumber
})

export default RootReducer
