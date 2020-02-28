import Axios from 'utils/axios'

export const createZH = data=> Axios.post(`/managers/create`, data)