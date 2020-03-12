import Axios from 'utils/axios'
import clean from 'lodash-clean'
export const getCustomers = async params =>
  await Axios.get(`/users`, clean({ params }))

export const getCustomer = async ({ id }) => await Axios.get(`/users/${id}`)
