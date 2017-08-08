import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
    <header className="header">
        <div className="logo">
            <Link to='/' style={{ textDecoration: 'none' }}>Timer</Link>
        </div>
        <div className="menu">
            <Link to='/settings' style={{ textDecoration: 'none' }}>Settings</Link>
        </div>
    </header>
)

export default Header
