import Axios from 'utils/axios'

export const createZH = data=> Axios.post(`/managers/create/${data.typee}`, data)
export const getMarkets = async () => await Axios.get(`/markets/`)