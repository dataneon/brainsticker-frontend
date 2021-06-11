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
      window.location.replace('http://localhost:3000/login');
    // else authorize user via backend
    } else {
      fetch('http://127.0.0.1:8000/api/v1/users/auth/user/', {
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
  <div>
    {loading === false && (
      <Fragment>
        <h2>Dashboard</h2>
        <h4>Hello {userEmail}!</h4>
        <p></p>
        {/* send userID to CanvasList as props */}
        <AddCanvas userID={userID}/>
        <CanvasList userID = {userID}/>
      </Fragment>
    )}
  </div>
  );
};

export default Dashboard;
