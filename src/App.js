import React from 'react'
import { Provider } from 'react-redux'
import Store from '../src/redux/store'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from 'components/AppRouter'
import { AuthProviderContainer } from 'context/AuthContext'

const App = () => {
  return (
    <Provider store={Store}>
      <AuthProviderContainer>
        <BrowserRouter>
          <AppRouter />
        </BrowserRouter>
      </AuthProviderContainer>
    </Provider>
  )
}

export default App
