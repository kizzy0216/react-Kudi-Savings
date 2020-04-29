import Axios, { MediaService } from 'utils/axios'
import clean from 'lodash-clean'
export const getCustomers = async params =>
  await Axios.get(`/users`, clean({ params }))

export const getCustomer = async ({ id }) => await Axios.get(`/users/${id}`)

export const uploadAvatar = (image, callback) =>
  MediaService.post(`/images`, image, callback)

export const updateCustomer = customer => {
  const { id, ...rest } = customer
  return Axios.put(`/users/${id}`, rest)
}
export const getPlans = ({ id }) => Axios.get(`/plans/${id}/user`)

export const getHistoryByPlan = ({ id, params }) =>
  Axios.get(`plans/${id}/wallets`, clean({ params }))
