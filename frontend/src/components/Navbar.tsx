import React from 'react'
import Logo from '../img/lilalokki.png'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='navbar'>
            <div className="container">
                <div className="links">
                    <Link className='link' to='/'><h1>Home</h1></Link>
                    <Link className='link' to='about'><h1>About</h1></Link>
                </div>
                <div className="logo">
                    <Link to={'/'}>
                        <img src={Logo} alt='logo' />
                    </Link>
                </div>
                <div className='userprofile'>
                    <span>Username</span>
                    <span>
                        <Link to='/Login'>Logout</Link>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Navbar