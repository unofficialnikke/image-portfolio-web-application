import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { addNewUser } from '../requests/Auth'
import { RegisterInputs } from '../type'
import { validRegistration } from '../utils/Validation'
import { AuthContext } from '../context/authContext'
import { UserContext } from '../context/userContext'

const Register = () => {
    const { currentUser, logout } = useContext(AuthContext)

    const [inputs, setInputs] = useState<RegisterInputs>({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        phone: '',
        city: ''
    })
    const [passwordCheck, setPasswordCheck] = useState('')
    const [error, setError] = useState<string | null>(null)
    const { setUserFetch } = useContext(UserContext)
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
            } else {
                console.log(result.data)
                setUserFetch(true)
                navigate('/login')
            }
        }
    }

    return (
        <div className='auth'>
            <h1>Register</h1>
            <div className="container">
                {
                    currentUser ? (
                        <div>
                            <form>
                                <div>
                                    <h1>Hey there!</h1>
                                    <h3>You are already signed in!</h3>
                                    <span onClick={logout}><Link to='/register'>Do you want to logout?</Link>
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
                                    <h3>Full name:</h3>
                                    <input required type='text' placeholder='enter firstname...' name='firstname' onChange={handleChange}></input>
                                </div>
                                <div>
                                    <input required type='text' placeholder='enter lastname...' name='lastname' onChange={handleChange}></input>
                                </div>
                                <div>
                                    <h3>Phone (optional):</h3>
                                    <input required type='text' placeholder='enter phone number...' name='phone' onChange={handleChange}></input>
                                </div>
                                <div>
                                    <h3>City:</h3>
                                    <input required type='text' placeholder='enter city...' name='city' onChange={handleChange}></input>
                                </div>
                                <div>
                                    <h3>Password:</h3>
                                    <input required type='password' placeholder='enter password...' name='password' onChange={handleChange}></input>
                                </div>
                                <div>
                                    <input required type='password' placeholder='re-enter password...' value={passwordCheck} onChange={(e) => setPasswordCheck(e.target.value)}></input>
                                </div>
                                <button onClick={handleSubmit}>Register</button>
                                <span>Already have an account? <Link to='/login'>Login</Link>
                                </span>
                            </form>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Register