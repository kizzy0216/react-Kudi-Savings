import Axios from 'utils/axios'

export const createMarket = data => Axios.post(`/markets/create`, data)

export const editMarket = data => Axios.put(`/markets/${data.id}`, data)

export const getMarkets = async ({ page, limit }) =>
  await Axios.get(`/markets?limit=${limit}&page=${page}`)

export const getAllMarkets = async () => await Axios.get(`/markets`)

export const getSingleMarket = async ({ id }) =>
  await Axios.get(`/markets/${id}`)

export const processTransaction = async (id, amount, type, reason) =>
  await Axios.put(
    `/markets/transaction?amount=${amount}&planId=${id}&type=${type}`,
    reason
  )
