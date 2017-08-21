import React, { Component } from 'react'
import { Link } from 'react-router-dom'
// import { withRouter } from 'react-router'

// The Header creates links that can be used to navigate
// between routes.
class Header extends Component {

    /**
     * Click handler for settings/menu icon
     */
    settingsClickHandler = () => {
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.location !== this.props.location) {
    //         // navigated!
    //     }
    // }

    render() {
        // const { match, location, history } = this.props

        // console.log('location', location);
        // console.log('match', match);
        // console.log('history', history);

        return (
            <header className="header">
                <div className="logo">
                    <Link to='/' style={{ textDecoration: 'none', fontSize: '1.3em' }}>Timer</Link>
                </div>
                <div className="menu">
                    <Link to='/settings'
                        onClick={this.settingsClickHandler}
                        style={{ textDecoration: 'none', fontSize: '1.5em' }}>&#9776;</Link>
                </div>
            </header>
        );
    }
}

// const HeaderComponent = withRouter(Header);

export default Header
