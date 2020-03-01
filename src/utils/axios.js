import axios from 'axios'
import { getDefaultAuth, setLogout } from '../context/AuthContext'

//Default Request Config

let Axios = axios.create({
  baseURL: 'https://savings-dev.kudi.ng',
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
    if (response && response.status === 403) {
      return setLogout()
    }
    return Promise.reject(response)
  }
)
export default Axios

// Media Service Request Config
export const MediaService = axios.create()
MediaService.defaults.baseURL = 'https://staging-media-service.herokuapp.com'
