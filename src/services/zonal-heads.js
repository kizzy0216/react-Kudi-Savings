import Axios from 'utils/axios'

//create a new zonal head
export const createZH = data =>
  Axios.post(`/managers/create/${data.type}`, data)

//fetch all Managers
export const getManagers = async () => await Axios.get(`/managers/`)

//fetch a single manager
export const getManager = async ({ id }) => await Axios.get(`/managers/${id}`)

//fund zonal head's wallet
export const fundWallet = managerId => Axios.post(`/topup/${managerId}/agent`)

//edit new zonal head
export const updateZH = data =>
  Axios.put(`/managers/${data.id}/update`, data)
