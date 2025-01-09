import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext'
import { useTheme } from '../context/themeContext'
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs'
const Navbar = () => {
    const { currentUser, logout } = useContext(AuthContext)
    const { theme, toggleTheme } = useTheme();
    const [sticky, setSticky] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 0)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])
    return (
        <div className={`navbar ${sticky ? 'sticky' : ''}`}>
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
                    <div>
                        <button className='theme-button ' onClick={toggleTheme}>
                            {theme === 'dark' ? (
                                <BsFillMoonFill />
                            ) : (
                                <BsFillSunFill />
                            )}
                        </button>
                    </div>
                    <div className="authbutton">
                        {
                            currentUser ? (
                                <button onClick={logout}>Logout</button>
                            ) : (
                                <div>
                                    <button>
                                        <Link className='auth-link' to='/login'>Login</Link>
                                    </button>
                                    <button>
                                        <Link className='auth-link' to='/register'>Register</Link>
                                    </button>
                                </div>
                            )
                        }

                    </div>
                    {
                        currentUser ? (
                            <div className="profile">
                                <Link to={`/profile/${currentUser.id}`}>
                                    <img src='/profile.jpg'
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