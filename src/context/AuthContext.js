import React, { createContext, useState } from 'react'
const AuthContext = createContext()
export const AuthProvider = AuthContext.Provider
export const AuthConsumer = AuthContext.Consumer

export const getDefaultAuth = () => {
  try {
    return JSON.parse(localStorage.getItem('ksavings-token'))
  } catch (e) {
    return null
  }
}
export const setLogout = () => {
  localStorage.removeItem('ksavings-token')
  window.location.href = '/'
}

export const AuthProviderContainer = ({ children, history }) => {
  const defaultAuth = getDefaultAuth()
  const [auth, setAuth] = useState(defaultAuth)

  const setAuthAndCache = (value = null) => {
    value
      ? localStorage.setItem('ksavings-token', JSON.stringify(value))
      : localStorage.removeItem('ksavings-token')

    setAuth(value)
  }

  return (
    <AuthProvider value={[auth, setAuthAndCache, setLogout]}>
      {children}
    </AuthProvider>
  )
}
export default AuthContext
