import React, { useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';
import { LOGIN, GET_USER } from '../queries';

const Login = ({ show, setUser, setPage }) => {
  const [loginUser, result] = useMutation(LOGIN);
  const [getUser, userResult] = useLazyQuery(GET_USER);
  const formHandler = (e) => {
    e.preventDefault();
    loginUser({
      variables: {
        username: e.target.username.value,
        password: e.target.password.value,
      },
    });
  };
  useEffect(() => {
    if (result.data) {
      localStorage.setItem('library-token', result.data.login.value);
      getUser();
      if (userResult.data) {
        if (userResult.data.me)
          setUser({
            username: userResult.data.me.username,
            favouriteGenre: userResult.data.me.favouriteGenre,
          });
        setPage('books');
      }
    }
  }, [result.data, userResult.data]); // eslint-disable-line

  if (!show) return null;

  return (
    <div>
      <form onSubmit={formHandler}>
        <input type="text" placeholder="User Name" name="username" />
        <input type="password" placeholder="password" name="password" />
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
