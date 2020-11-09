import Axios from 'utils/axios'
import clean from 'lodash-clean'

export const resetPin = async phone =>
  await Axios.put(`/ussd/dashboard/pin-reset?phone=${phone}`)
