import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
    const navigate = useNavigate();

    return (
        <div className='auth'>
            <h1>Login</h1>
            <div className="container">
                <form>
                    <div>
                        <h3>Email address:</h3>
                        <input required type='text' placeholder='enter email...'></input>
                    </div>
                    <div>
                        <h3>Password:</h3>
                        <input required type='text' placeholder='enter password...'></input>
                    </div>
                    <a onClick={() => navigate('/reset')}>Forgot your password?
                    </a>
                    <button onClick={() => navigate('/')}>Login</button>
                    <span>No account yet? <Link to='/register'>Register</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Login