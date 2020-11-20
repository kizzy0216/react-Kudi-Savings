import { SET_CUSTOMER_MARKETID, SET_CUSTOMER_STATUS, SET_CUSTOMER_DATE, CLEAR_CUSTOMER_MARKETID, CLEAR_CUSTOMER_STATUS, CLEAR_CUSTOMER_DATE, CLEAR_CUSTOMER_DATA } from '../customer-action-types'

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

export const setCustomerDate = (payload) => {
    return{
        type: SET_CUSTOMER_DATE,
        payload: payload
    }
}

export const clearCustomerData = () => async dispatch => {
    dispatch({
        type: CLEAR_CUSTOMER_DATA
    });
}

export const clearCustomerMarketId = () => async dispatch => {
    dispatch({
        type: CLEAR_CUSTOMER_MARKETID
    });
}

export const clearCustomerStatus = () => async dispatch => {
    dispatch({
        type: CLEAR_CUSTOMER_STATUS
    });
}

export const clearCustomerDate = () => async dispatch => {
    dispatch({
        type: CLEAR_CUSTOMER_DATE
    });
}