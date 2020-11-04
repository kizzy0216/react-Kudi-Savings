import {CUSTOMER_PHONE_NUMBER} from '../customer-action-types'

export const PhoneNumber = (number) => {
    return{
        type: CUSTOMER_PHONE_NUMBER,
        payload: number
    }
}