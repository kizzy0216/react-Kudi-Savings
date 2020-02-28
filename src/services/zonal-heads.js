import Axios from 'utils/axios'

export const createZH = data=> Axios.post(`/managers/create/${data.typee}`, data)
export const getManagers = async () => await Axios.get(`/managers/`)
export const getManager = async (id) => await Axios.get(`/managers/${id}`)