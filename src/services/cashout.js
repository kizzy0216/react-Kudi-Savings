import Axios from 'utils/axios'
import clean from 'lodash-clean'

export const  getWithdrawals = async params =>
  await Axios.get(`/withdrawal`, clean({ params }))
export const getWithdrawal  = async ({ id }) => await Axios.get(`/withdrawal/${id}`)
export const processWithdrawal  = async ({ id,status,reason }) => await Axios.put(`/withdrawal/${id}/${status}/validate`, reason)