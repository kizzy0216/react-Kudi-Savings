import React from 'react'
import { Provider } from 'react-redux'
import store, { persistor } from '../src/redux/store'
import { BrowserRouter } from 'react-router-dom'
import AppRouter from 'components/AppRouter'
import { AuthProviderContainer } from 'context/AuthContext'
import { PersistGate } from 'redux-persist/integration/react'
import { DashboardLoading } from './components/loading'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<DashboardLoading />} persistor={persistor}>
        <AuthProviderContainer>
          <BrowserRouter>
            <AppRouter />
          </BrowserRouter>
        </AuthProviderContainer>
      </PersistGate>
    </Provider>
  )
}

export default App
