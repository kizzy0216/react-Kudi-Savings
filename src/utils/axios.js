import axios from 'axios'
import { getDefaultAuth, setLogout } from '../context/AuthContext'

let Axios = axios.create({
  baseURL: process.env.REACT_APP_BASEURL,
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
  ({ response }) => {
    if (response && response.status === 307) {
      return setLogout()
    }
    return Promise.reject(response)
  }
)
export default Axios

// Media Service Request Config
export const MediaService = axios.create()
MediaService.defaults.baseURL = process.env.REACT_APP_MEDIA
