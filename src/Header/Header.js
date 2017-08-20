import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
    <header className="header">
        <div className="logo">
            <Link to='/' style={{ textDecoration: 'none', fontSize: '1.3em' }}>Timer</Link>
        </div>
        <div className="menu">
            <Link to='/settings' style={{ textDecoration: 'none', fontSize: '1.5em' }}>&#9776;</Link>
        </div>
    </header>
)

export default Header
