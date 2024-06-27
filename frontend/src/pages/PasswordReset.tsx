import React from 'react'
import { useNavigate } from 'react-router-dom'

const PasswordReset = () => {
    const navigate = useNavigate();

    return (
        <div className='auth'>
            <h1>Reset password</h1>
            <div className="container">
                <form>
                    <div>
                        <h3>Email address:</h3>
                        <input required type='text' placeholder='enter email...'></input>
                    </div>
                    <button onClick={() => navigate('/login')}>Reset</button>
                </form>
            </div>
        </div>
    )
}

export default PasswordReset