import Axios, { MediaService } from 'utils/axios'

export const createAgent = agent => Axios.post(`/agents/create`, agent)

export const uploadAvatar = (image, callback) =>
  MediaService.post(`/images`, image, callback)


export const getAgents  = async ({ page }) =>
  await Axios.get(`/agents?limit=60&page=${page}`)
  
export const getAgent = async ({ id }) => await Axios.get(`/agents/${id}`)

export const getUsers = async ({ id }) =>
  await Axios.get(`/users/${id}/downline`)

export const updateAgent = agent => {
  const { id, ...rest } = agent
  return Axios.put(`/agents/${id}`, rest)
}
