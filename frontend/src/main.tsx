import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.scss'
import { AuthContextProvider } from './context/authContext.tsx'
import { UserContextProvider } from './context/userContext.tsx'
import { CategoryContextProvider } from './context/categoryContext.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <CategoryContextProvider>
          <App />
        </CategoryContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
