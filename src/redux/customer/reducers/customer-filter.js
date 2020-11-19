import { SET_CUSTOMER_MARKETID, SET_CUSTOMER_STATUS, SET_CUSTOMER_DATE, CLEAR_CUSTOMER_MARKETID, CLEAR_CUSTOMER_STATUS } from '../customer-action-types'

const initialState = {
  marketId: '',
  status: '',
  dateFrom: '',
  dateTo: ''
}

const CustomerFilters = (state = initialState, action) => {
  switch (action.type) {
    case SET_CUSTOMER_MARKETID:
      console.log('action.payload', action.payload);
      return {
        ...state,
        marketId: action.payload
      }
    case SET_CUSTOMER_STATUS:
      return {
        ...state,
        status: action.payload
      }
    case SET_CUSTOMER_DATE:
      const {dateFrom, dateTo} = action.payload;
      return {
        ...state,
        dateFrom: dateFrom,
        dateTo: dateTo
      }
    case CLEAR_CUSTOMER_MARKETID:
      return {
        ...state,
        marketId: ''
      }
    case CLEAR_CUSTOMER_STATUS:
      return {
        ...state,
        status: ''
      }
    default:
      return state
  }
}

export default CustomerFilters