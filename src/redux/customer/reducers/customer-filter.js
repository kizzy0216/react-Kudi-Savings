import { SET_CUSTOMER_MARKETID, SET_CUSTOMER_STATUS, SET_CUSTOMER_DATE, CLEAR_CUSTOMER_MARKETID, CLEAR_CUSTOMER_STATUS, CLEAR_CUSTOMER_DATE, CLEAR_CUSTOMER_DATA } from '../customer-action-types'

import moment from 'moment'
const initialState = {
  marketId: '',
  status: '',
  startDate: moment().subtract(29, 'days'),
  endDate: moment(),
  isDateFilter: true
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
      const {startDate, endDate} = action.payload;
      return {
        ...state,
        startDate: startDate,
        endDate: endDate,
        isDateFilter: true
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
    case CLEAR_CUSTOMER_DATE:
      return {
        ...state,
        isDateFilter: false
      }
    case CLEAR_CUSTOMER_DATA:
      return {
        ...initialState
      }
    default:
      return state
  }
}

export default CustomerFilters