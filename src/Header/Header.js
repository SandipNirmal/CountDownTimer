import React from 'react'
import { Link } from 'react-router-dom'

// The Header creates links that can be used to navigate
// between routes.
const Header = () => (
    <header className="header">
        <div className="logo">
            <Link to='/'>Timer</Link>
        </div>
        <div className="menu">
            <Link to='/settings'>Settings</Link>
        </div> 
    </header>
)

export default Header
