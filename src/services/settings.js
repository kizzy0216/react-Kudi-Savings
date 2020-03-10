import Axios from 'utils/axios'

export const changePassword = user => Axios.post(`/auth/login`, user)
