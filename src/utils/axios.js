import axios from 'axios'
import config from './config'
import { getDefaultAuth, setLogout } from '../context/AuthContext'

let Axios = axios.create({
  baseURL: config.baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
})

Axios.interceptors.request.use(defaultConfig => {
  let config
  const user = getDefaultAuth()

  if (user) {
    config = {
      ...defaultConfig,
      headers: {
        ...defaultConfig.headers,
        Authorization: `Bearer ${user.token}`
      }
    }
  } else {
    config = defaultConfig
  }

  return config
})

Axios.interceptors.response.use(
  response => {
    return response
  },
  e => {
    if (e?.response && e?.response?.status === 307) {
      return setLogout()
    }
    if (e?.message && e.message === 'Network Error') {
      return setLogout()
    }

    return Promise.reject(e?.response)
  }
)
export default Axios

// Media Service Request Config
export const MediaService = axios.create()
MediaService.defaults.baseURL = config.mediaService
