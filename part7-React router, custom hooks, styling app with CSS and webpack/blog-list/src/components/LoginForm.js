import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/usersReducer';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

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
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formBasicUserName">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassWord">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button type="submit" variant="primary" id="loginButton">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LoginForm;
