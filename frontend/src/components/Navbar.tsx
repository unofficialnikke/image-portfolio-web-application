import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext)
    return (
        <div className='navbar'>
            <div className="container">
                <div className="links">
                    <Link to='/'><h1>Home</h1></Link>
                    <Link to='about'><h1>About</h1></Link>
                </div>
                <div className="logo">
                    <Link to={'/'}>
                        <img src='/lilalokki.png' alt='logo' />
                    </Link>
                </div>
                <div className='userprofile'>
                    <div className="authbutton">
                        {
                            currentUser ? (
                                <button onClick={logout}>Logout</button>
                            ) : (
                                <div>
                                    <button>
                                        <Link to='/login'>Login</Link>
                                    </button>
                                    <button>
                                        <Link to='/register'>Register</Link>
                                    </button>
                                </div>
                            )
                        }

                    </div>
                    {
                        currentUser ? (
                            <div className="profile">
                                <Link to={`/profile/${currentUser.id}`}>
                                    <img src='/doge.jpg'
                                    />
                                </Link>
                                <span>{currentUser.firstname}</span>
                            </div>

                        ) : (
                            <div></div>
                        )
                    }

                </div>
            </div>
        </div>
    )
}

export default Navbar