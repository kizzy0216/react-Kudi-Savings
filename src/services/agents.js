import Axios, { MediaService } from 'utils/axios'
import clean from 'lodash-clean'

export const createAgent = agent => Axios.post(`/agents/create`, agent)

export const uploadAvatar = (image, callback) =>
  MediaService.post(`/images`, image, callback)

export const getAgents = async ({ page, limit }) =>
  await Axios.get(`/agents?limit=${limit}&page=${page}`)

export const getAgent = async ({ id }) => await Axios.get(`/agents/${id}`)

export const getAgentActivity = async ({ params }) =>
  await Axios.get(`/agents/activity`, clean({ params }))

export const getAgentActivityById = async ({ id, ...params }) =>
  await Axios.get(`/agents/${id}/activity`, clean(params))

export const getUsers = async ({ id, ...params }) =>
  await Axios.get(`/users/${id}/downline`, clean({ params }))

export const getUsersOnboarded = async ({ id, ...params }) =>
  await Axios.get(`/agents/${id}/onboarded`, clean({ params }))

export const updateAgent = agent => {
  const { id, ...rest } = agent
  return Axios.put(`/agents/${id}`, rest)
}
//fund zonal head's wallet
export const fundWallet = (managerId, amount) =>
  Axios.post(`/topup/${managerId}/agent`, { amount })

//Suspend agent by admin
export const updateStatus = (id, status) => Axios.put(`/agents/${id}/${status}`)

//Get wallet history details
export const walletHistory = ({ id, params }) =>
  Axios.get(`/agents/${id}/wallets`, clean({ params }))
