import Axios from 'utils/axios'

export const createMarket = data => Axios.post(`/markets/create`, data)

