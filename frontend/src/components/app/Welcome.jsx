import React from 'react';
import Signup from '../auth/Signup'
import Login from '../auth/Login'

function Welcome(props) {
    return (
        <div>
            <Signup />
            <Login />
        </div>
    );
}

export default Welcome;
