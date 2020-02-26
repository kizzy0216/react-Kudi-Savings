import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from 'react-toast-notifications';
import AppRouter from 'components/AppRouter'
import { AuthProviderContainer } from 'context/AuthContext'

const App = () => {
    return (
        <ToastProvider autoDismissTimeout={3000} autoDismiss>
        <AuthProviderContainer>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </AuthProviderContainer>
        </ToastProvider>
    )
}

export default App
