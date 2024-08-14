import { RouterProvider, createBrowserRouter, Outlet } from 'react-router-dom'
import ErrorBoundary from './pages/ErrorBoundary'
import About from './pages/About'
import Home from './pages/Home'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PasswordReset from './pages/PasswordReset'
import ErrorPage from './pages/ErrorPage'
import './styles/app.scss'

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/profile/:userId',
        element: <Profile />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '/reset',
        element: <PasswordReset />
      },
      {
        path: '/about',
        element: <About />
      },
      {
        path: '/*',
        element: <ErrorPage />
      },
    ]
  }
])

function App() {
  return (
    <div className='app'>
      <div className='container'>
        <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
