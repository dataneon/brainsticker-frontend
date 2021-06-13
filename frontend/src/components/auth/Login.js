import React, { useState, useEffect } from 'react';

function Login() {
  // form control
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
      password: password
    };

    // fetch request uses `user`
    fetch('https://brainsticker.herokuapp.com/notes/api/v1/users/auth/login/', {
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
          setPassword('');
          localStorage.clear();
          setErrors(true);
        }
      });
  };

  return (
    <div>
      {loading === false && <h1>Login</h1>}
      {errors === true && <h2>Cannot log in with provided credentials</h2>}
      {loading === false && (
        <form onSubmit={onSubmit}>
          <label htmlFor='email'>Email address:</label> <br />
          <input
            name='email'
            type='email'
            value={email}
            required
            onChange={e => setEmail(e.target.value)}
          />{' '}
          <br />
          <label htmlFor='username'>Username:</label> <br />
          <input
            name='username'
            type='username'
            value={username}
            required
            onChange={e => setUsername(e.target.value)}
          />{' '}
          <br />
          <label htmlFor='password'>Password:</label> <br />
          <input
            name='password'
            type='password'
            value={password}
            required
            onChange={e => setPassword(e.target.value)}
          />{' '}
          <br />
          <input type='submit' value='Login' className="auth-input-buttons" />
        </form>
      )}
    </div>
  );
};

export default Login;
