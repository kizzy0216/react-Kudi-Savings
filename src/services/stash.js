import Axios from 'utils/axios'
import clean from 'lodash-clean'
export const getStashTransactions = async params =>
  await Axios.get(`/stash/transactions`, clean({ params }))
