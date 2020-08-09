import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/usersReducer';
import { useHistory } from 'react-router-dom';

const LoginForm = () => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
    setUserName('');
    setPassword('');
    history.push('/');
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

export default LoginForm;
