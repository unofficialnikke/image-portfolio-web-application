import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { addNewUser } from '../requests/Auth'
import { RegisterInputs } from '../type'
import { validRegistration } from '../functions/Validation'

const Register = () => {
    const [inputs, setInputs] = useState<RegisterInputs>({
        firstname: '',
        lastname: '',
        email: '',
        password: ''
    })
    const [passwordCheck, setPasswordCheck] = useState('')
    const [error, setError] = useState<string | null>(null)
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputs(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (validRegistration(inputs, passwordCheck, setError)) {
            const result = await addNewUser(inputs)
            if (!result.success) {
                setError(result.data)
                console.log(result.data)
                return
            } else {
                console.log(result.data)
                navigate('/login')
            }
        }
    }

    return (
        <div className='auth'>
            <h1>Register</h1>
            <div className="container">
                <form>
                    <div>
                        <h3>Email address:</h3>
                        <input required type='text' placeholder='enter email...' name='email' onChange={handleChange}></input>
                    </div>
                    <div>
                        <h3>Full name:</h3>
                        <input required type='text' placeholder='enter firstname...' name='firstname' onChange={handleChange}></input>
                    </div>
                    <div>
                        <input required type='text' placeholder='enter lastname...' name='lastname' onChange={handleChange}></input>
                    </div>
                    <div>
                        <h3>Password:</h3>
                        <input required type='password' placeholder='enter password...' name='password' onChange={handleChange}></input>
                    </div>
                    <div>
                        <input required type='password' placeholder='re-enter password...' value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)}></input>
                    </div>
                    <button onClick={handleSubmit}>Register</button>
                    {error && <p>{error}</p>}
                    <span>Already have an account? <Link to='/login'>Login</Link>
                    </span>
                </form>
            </div>
        </div>
    )
}

export default Register