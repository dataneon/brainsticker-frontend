import React from 'react';
import Header from '../layout/Header'
import Signup from '../auth/Signup'
import Login from '../auth/Login'

function Welcome(props) {
    return (
        <div>
            <Header />
            <Signup />
            <Login />
        </div>
    );
}

export default Welcome;