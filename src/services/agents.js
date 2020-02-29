import Axios, { MediaService } from 'utils/axios'

export const createAgent = agent => Axios.post(`/agents/create`, agent)

export const uploadAvatar = image => MediaService.post(`/images`, image)

export const getAgents = () => Axios.get(`/agents`)
