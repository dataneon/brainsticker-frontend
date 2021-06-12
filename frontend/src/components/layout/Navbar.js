import React, { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
    const [isAuth, setIsAuth] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('token') !== null) {
            setIsAuth(true);
        }
    }, []);
    
    return (
        <nav>
            <h1 id="main-title">BRAINSTICKER</h1>
            <h2 id="sub-title">Digital sticky notes</h2>
            <ul id="nav-links-ul">
                {isAuth === true ? (
                    <Fragment>
                        {' '}
                        <li>
                            <Link to='/dashboard' className="nav-links">Dashboard</Link>
                        </li>
                        <li>
                            <Link to='/logout' className="nav-links" id="nav-link-logout">Logout</Link>
                        </li>
                    </Fragment>
                ) : (
                    <Fragment>
                        {' '}
                        <li className="nav-links">
                            <Link to='/login' className="nav-links">Login</Link>
                        </li>
                        <li className="nav-links">
                            <Link to='/signup' className="nav-links">Signup</Link>
                        </li>
                    </Fragment>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;