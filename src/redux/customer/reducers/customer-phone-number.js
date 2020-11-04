import { CUSTOMER_PHONE_NUMBER } from '../customer-action-types'

const initialState = {
  phoneNumber: ''
}

const CustomerPhoneNumber = (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMER_PHONE_NUMBER:
      return {
        ...state,
        phoneNumber: action.payload
      }
    default:
      return state
  }
}

export default CustomerPhoneNumber