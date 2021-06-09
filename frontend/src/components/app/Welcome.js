import React from 'react';
import Header from '../layout/Header'
import Signup from '../auth/Signup'
import Login from '../auth/Login'
import Navbar from '../layout/Navbar'

function Welcome(props) {
    return (
        <div>
            <Header />
            <Navbar />
            <Signup />
            <Login />
        </div>
    );
}

export default Welcome;