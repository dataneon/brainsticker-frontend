import React, { useState, useEffect, Fragment } from 'react';
import AddCanvas from './AddCanvas';
import CanvasList from './CanvasList';

function Dashboard() {
  const [userEmail, setUserEmail] = useState('');
  const [userID, setUserID] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // if local storage does not have user's token, send to login page
    if (localStorage.getItem('token') === null) {
      window.location.replace('http://brainsticker-frontend.surge.sh/login/');
    // else authorize user via backend
    } else {
      fetch('https://brainsticker.herokuapp.com/api/v1/users/auth/user/', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${localStorage.getItem('token')}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setUserEmail(data.email);
          setUserID(data.pk)
          setLoading(false);
        });
    }
  }, []);

  return (
  <div id="dashboard">
    {loading === false && (
      <Fragment>
        <h3 className="mid-level-header">Dashboard</h3>
        <h4 id="greeting">Hello, {userEmail}!</h4>
        <p></p>
        {/* send userID to CanvasList as props */}
        <AddCanvas userID={userID}/>
        <CanvasList userID={userID}/>
      </Fragment>
    )}
  </div>
  );
};

export default Dashboard;
