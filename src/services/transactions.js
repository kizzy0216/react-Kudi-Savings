import Axios from 'utils/axios'
import clean from 'lodash-clean'
export const getTransactions = async params =>
  await Axios.get(`/collections`, clean({ params }))

export const getTransaction = async ({ id }) =>
  await Axios.get(`/collections/${id}/details`)
