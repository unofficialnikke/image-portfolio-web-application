import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../styles/login.scss'

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className='auth'>
            <h1>Login</h1>
            <form>
                <div>
                    <p>Email address:</p>
                    <input type='text' placeholder='enter email...'></input>
                </div>
                <div>
                    <p>Password:</p>
                    <input type='text' placeholder='enter password...'></input>
                </div>
                <a onClick={() => navigate('/reset')}>Forgot your password?
                </a>
                <button onClick={() => navigate('/')}>Login</button>
                <span>No account yet? <Link to='/register'>Register</Link>
                </span>
            </form>
        </div>
    )
}

export default Login