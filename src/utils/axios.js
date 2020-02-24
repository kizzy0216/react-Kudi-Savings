import axios from 'axios'
import { getDefaultAuth } from '../context/AuthContext'

//Default Request Config

axios.defaults.baseURL = 'https://savings-dev.kudi.ng'
let Axios = axios.create({
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
export default Axios

// Media Service Request Config

export const MediaService = axios.create()
MediaService.defaults.baseURL = 'https://staging-media-service.herokuapp.com'
