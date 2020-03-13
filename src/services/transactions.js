import Axios from 'utils/axios'

export const getTransactions = async params =>
  await Axios.get(`/collections`, { params })

export const getTransaction = async ({ id }) =>
  await Axios.get(`/collections/${id}`)
