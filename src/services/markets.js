import Axios from 'utils/axios'

export const createMarket = data => Axios.post(`/markets/create`, data)

export const getMarkets = async () => await Axios.get(`/markets/`)
