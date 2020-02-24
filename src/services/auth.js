import Axios from 'utils/axios'

export const loginUser = user => Axios.post(`/auth/login`, user)
