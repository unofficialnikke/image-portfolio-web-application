import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const Register = () => {
    const navigate = useNavigate();


    return (
        <div className='auth'>
            <h1>Register</h1>
            <form>
                <div>
                    <h3>Email address:</h3>
                    <input type='text' placeholder='enter email...'></input>
                </div>
                <div>
                    <h3>Password:</h3>
                    <input type='text' placeholder='enter password...'></input>
                </div>
                <div>
                    <h3>Re-enter password:</h3>
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