import { SET_CUSTOMER_MARKETID, SET_CUSTOMER_STATUS, SET_CUSTOMER_DATE, CLEAR_CUSTOMER_MARKETID, CLEAR_CUSTOMER_STATUS } from '../customer-action-types'

export const setCustomerMarketId = (marketId) => async dispatch => {
    dispatch({
        type: SET_CUSTOMER_MARKETID,
        payload: marketId
    });
}

export const setCustomerStatus = (status) => async dispatch => {
    dispatch({
        type: SET_CUSTOMER_STATUS,
        payload: status
    });
}

export const Date = (payload) => {
    return{
        type: SET_CUSTOMER_DATE,
        payload: payload
    }
}

export const clearCustomerMarketId = (marketId) => async dispatch => {
    dispatch({
        type: CLEAR_CUSTOMER_MARKETID,
        payload: marketId
    });
}

export const clearCustomerStatus = (status) => async dispatch => {
    dispatch({
        type: CLEAR_CUSTOMER_STATUS,
        payload: status
    });
}