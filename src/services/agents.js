import Axios, { MediaService } from 'utils/axios'

export const createAgent = agent => Axios.get(`/markets`, agent)

export const uploadAvatar = agent => MediaService.post(`/images`, agent)
