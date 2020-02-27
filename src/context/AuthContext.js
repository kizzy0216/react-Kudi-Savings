import React, { createContext, useState } from 'react'
const AuthContext = createContext()
export const AuthProvider = AuthContext.Provider
export const AuthConsumer = AuthContext.Consumer

export const getDefaultAuth = () => {
    try {
        return JSON.parse(localStorage.getItem('auth-token'))
    } catch (e) {
        return null
    }
}

export const AuthProviderContainer = ({ children, history }) => {
    const defaultAuth = getDefaultAuth()
    const [auth, setAuth] = useState(defaultAuth)

    const setAuthAndCache = (value = null) => {
        value
            ? localStorage.setItem('auth-token', JSON.stringify(value))
            : localStorage.removeItem('auth-token')

        setAuth(value)
    }
    const setLogout = () => {
        localStorage.removeItem('auth-token')
        window.location.href = '/'
    }

    return (
        <AuthProvider value={[auth, setAuthAndCache, setLogout]}>
            {children}
        </AuthProvider>
    )
}
export default AuthContext
