import Axios from 'utils/axios'
import clean from 'lodash-clean'
export const getTransactions = async params => {
  console.log(params)
  return await Axios.get(`/collections`, clean({ params }))
}

export const getTransaction = async ({ id }) =>
  await Axios.get(`/collections/${id}`)
