import Axios from 'utils/axios'

export const loginUser = user => Axios.post(`/auth/login`, user)
export const changePassword = data => Axios.post(`/auth/change-password`, data)
