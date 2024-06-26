import React from 'react'
import Logo from '../img/lilalokki.png'
import Profile from '../img/doge.jpg'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="container">
                <div className="links">
                    <Link to='/'><h1>Home</h1></Link>
                    <Link to='about'><h1>About</h1></Link>
                </div>
                <div className="logo">
                    <Link to={'/'}>
                        <img src={Logo} alt='logo' />
                    </Link>
                </div>
                <div className='userprofile'>
                    <div className="authbutton">
                        <button>
                            <Link to='/login'>Login</Link>
                        </button>
                        <button>
                            <Link to='/register'>Register</Link>
                        </button>
                    </div>
                    <div className="profile">
                        <img src={Profile} />
                        <span>Username</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar