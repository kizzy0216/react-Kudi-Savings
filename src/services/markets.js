import Axios from 'utils/axios'

export const createMarket = data => Axios.post(`/markets/create`, data)

export const getMarkets = async ({ page }) =>
  await Axios.get(`/markets?limit=20&page=${page}`)

export const getAllMarkets = async () => await Axios.get(`/markets`)
export const getSingleMarket = async id => await Axios.get(`/markets/${id}`)
