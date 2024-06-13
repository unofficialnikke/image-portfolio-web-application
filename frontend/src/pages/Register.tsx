import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import '../styles/login.scss'

const Register = () => {
    const navigate = useNavigate();


    return (
        <div className='auth'>
            <h1>Register</h1>
            <form>
                <div>
                    <h2>Email address:</h2>
                    <input type='text' placeholder='enter email...'></input>
                </div>
                <div>
                    <h2>Password:</h2>
                    <input type='text' placeholder='enter password...'></input>
                </div>
                <div>
                    <h2>Re-enter password:</h2>
                    <input type='text' placeholder='re-enter password...'></input>
                </div>
                <button onClick={() => navigate('/login')}>Register</button>
                <span>Already have an account? <Link to='/login'>Login</Link>
                </span>
            </form>
        </div>
    )
}

export default Register