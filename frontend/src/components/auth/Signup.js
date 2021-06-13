import React, { useState, useEffect } from 'react';

function Signup() {
  // form control
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  // errors pushes any errors into it
  const [errors, setErrors] = useState(false);
  // loading is used to allow a buffer time between login request and rendering
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (localStorage.getItem('token') !== null) {
      window.location.replace('http://brainsticker-frontend.surge.sh/dashboard');
    } else {
      setLoading(false);
    }
  }, []);

  const onSubmit = e => {
    e.preventDefault(); // keeps the page from refreshing when form is submitted

    // creating a user object with values entered in the form
    const user = {
      email: email,
      username: username,
      password1: password1,
      // password2 is for confirming the password
      password2: password2
    };

    // fetch request uses `user`
    fetch('https://brainsticker.herokuapp.com/notes/api/v1/users/auth/register/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    })
      .then(res => res.json())
      .then(data => {
        // checking to see if the request was successful
        if (data.key) {
          // set the token in local storage to one returned by API
          localStorage.clear();
          localStorage.setItem('token', data.key);
          // redirect the now authenticated user to the dashboard
          window.location.replace('http://brainsticker-frontend.surge.sh/dashboard');
        } else {
          // handles any errors
          setEmail('');
          setUsername('');
          setPassword1('');
          setPassword2('');
          localStorage.clear();
          setErrors(true);
        }
      });
  };

  return (
    <div>
      {loading === false && <h1>Signup</h1>}
      {errors === true && <h2>Cannot signup with provided credentials</h2>}
      <form onSubmit={onSubmit}>
        <label htmlFor='email'>Email address:</label> <br />
        <input
          name='email'
          type='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />{' '}
        <br />
        <label htmlFor='username'>Username:</label> <br />
        <input
          name='username'
          type='username'
          value={username}
          onChange={e => setUsername(e.target.value)}
          required
        />{' '}
        <br />
        <label htmlFor='password1'>Password:</label> <br />
        <input
          name='password1'
          type='password'
          value={password1}
          onChange={e => setPassword1(e.target.value)}
          required
        />{' '}
        <br />
        <label htmlFor='password2'>Confirm password:</label> <br />
        <input
          name='password2'
          type='password'
          value={password2}
          onChange={e => setPassword2(e.target.value)}
          required
        />{' '}
        <br />
        <input type='submit' value='Signup' className="auth-input-buttons"/>
      </form>
    </div>
  );
};

export default Signup;
