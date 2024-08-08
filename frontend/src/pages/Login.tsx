import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LoginInputs } from '../type'
import { AuthContext } from '../context/authContext'
import { validLogin } from '../utils/Validation'

const Login = () => {
    const { currentUser, logout } = useContext(AuthContext)
    const [inputs, setInputs] = useState<LoginInputs>({
        email: '',
        password: ''
    })
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate();
    const { login } = useContext(AuthContext)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (validLogin(inputs, setError)) {
            const result = await login(inputs)
            if (!result.success) {
                setError(result.data as string)
            } else {
                navigate('/')
            }
        }
    }

    return (
        <div className='auth'>
            <h1>Login</h1>
            <div className="container">
                {
                    currentUser ? (
                        <div>
                            <form>
                                <div>
                                    <h1>Hey there!</h1>
                                    <h3>You are already signed in!</h3>
                                    <span onClick={logout}><Link to='/login'>Do you want to logout?</Link>
                                    </span>
                                </div>
                            </form>
                        </div>
                    ) : (
                        <div>
                            <form>
                                {error && <p>{error}</p>}
                                <div>
                                    <h3>Email address:</h3>
                                    <input required type='text' placeholder='enter email...' name='email' onChange={handleChange}></input>
                                </div>
                                <div>
                                    <h3>Password:</h3>
                                    <input required type='password' placeholder='enter password...' name='password' onChange={handleChange}></input>
                                </div>
                                <a onClick={() => navigate('/reset')}>Forgot your password?
                                </a>
                                <button onClick={handleSubmit}>Login</button>
                                <span>No account yet? <Link to='/register'>Register</Link>
                                </span>
                            </form>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default Login