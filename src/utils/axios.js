import axios from 'axios'

import { getDefaultAuth } from '../context/AuthContext'
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
