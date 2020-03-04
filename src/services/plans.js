import Axios from 'utils/axios'

//create a new zonal head
export const createPlan = data => Axios.post(`/plans/create`, data)

//fetch all Plans
export const getPlans = async () => await Axios.get(`/plans/`)

//fetch a single plan
export const getPlan = async ({ id }) => await Axios.get(`/plans/${id}`)

//edit new zonal head
export const updatePlan = data => Axios.put(`/plans/${data.id}/update`, data)
