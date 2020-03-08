import Axios from 'utils/axios'

export const getCustomers = async ({ page, limit }) =>
  await Axios.get(`/users?limit=${limit}&page=${page}`)
