import Axios, { MediaService } from 'utils/axios'

export const createAgent = agent => Axios.post(`/agents/create`, agent)

export const uploadAvatar = (image, callback) =>
  MediaService.post(`/images`, image, callback)

export const getAgents = () => Axios.get(`/agents`)

export const getAgent = async ({ id }) => await Axios.get(`/agents/${id}`)
export const getUsers = async ({ id }) =>
  await Axios.get(`/users/${id}/downline`)
