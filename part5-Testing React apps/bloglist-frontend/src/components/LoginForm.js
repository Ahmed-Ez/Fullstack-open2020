import React, { useState } from 'react';
import propTypes from 'prop-types';

const LoginForm = ({ login }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    setUserName('');
    setPassword('');
  };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button id="loginButton">Login</button>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  login: propTypes.func.isRequired,
};

export default LoginForm;
