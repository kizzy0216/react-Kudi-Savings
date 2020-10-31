import Axios from 'utils/axios'
import clean from 'lodash-clean'

export const resetPin = async ({phone, params}) =>
  await Axios.put(`/ussd/dashboard/pin-reset?phone=${phone}`, clean({ params }))
