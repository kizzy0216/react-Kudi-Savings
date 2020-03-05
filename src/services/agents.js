import Axios, { MediaService } from 'utils/axios'

export const createAgent = agent => Axios.post(`/agents/create`, agent)

export const uploadAvatar = (image, callback) =>
  MediaService.post(`/images`, image, callback)

export const getAgents = async ({ page, limit }) =>
  await Axios.get(`/agents?limit=${limit}&page=${page}`)

export const getAgent = async ({ id }) => await Axios.get(`/agents/${id}`)

export const getUsers = async ({ id, page, limit }) =>
  await Axios.get(`/users/${id}/downline?limit=${limit}&page=${page}`)

export const updateAgent = agent => {
  const { id, ...rest } = agent
  return Axios.put(`/agents/${id}`, rest)
}

//fund zonal head's wallet
export const fundWallet = (managerId, amount) => Axios.post(`/topup/${managerId}/agent`, {amount})
