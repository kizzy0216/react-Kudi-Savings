import Axios, { MediaService } from 'utils/axios'

export const createAgent = agent => Axios.post(`/agents/create`, agent)

export const uploadAvatar = (image, callback) =>
    MediaService.post(`/images`, image, callback)

export const getAgents = () => Axios.get(`/agents`)
