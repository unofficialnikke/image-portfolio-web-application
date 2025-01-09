import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/index.scss'
import { AuthContextProvider } from './context/authContext.tsx'
import { UserContextProvider } from './context/userContext.tsx'
import { CategoryContextProvider } from './context/categoryContext.tsx'
import { ThemeProvider } from './context/themeContext.tsx'
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <UserContextProvider>
        <CategoryContextProvider>
          <ThemeProvider>
            <App />
          </ThemeProvider>
        </CategoryContextProvider>
      </UserContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
)
