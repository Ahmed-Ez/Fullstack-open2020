import React, { useEffect } from 'react';
import Blogs from './components/Blogs';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Blog from './components/Blog';
import Alert from './components/Alert';
import Users from './components/Users';
import User from './components/User';
import blogService from './services/blogs';
import { setAlert } from './reducers/alertsReducer';
import { setUser, logout } from './reducers/usersReducer';
import './index.css';
import { useSelector, useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const App = () => {
  const alert = useSelector((state) => state.alert);
  const user = useSelector((state) => state.users.loggedUser);
  const dispatch = useDispatch();
  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blog-key');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      dispatch(setUser(user));
      blogService.setToken(user.token);
    }
  }, [dispatch]);

  const logoutUser = () => {
    dispatch(logout());
    dispatch(setAlert({ text: 'Logged out ', type: 'success' }));
  };

  return (
    <Router>
      <div>
        <h1>Blog-List</h1>
        <div>
          <Link to="/">Blogs</Link>
          <Link to="/users">Users</Link>
          {user ? (
            <p>
              {user.username} <button onClick={logoutUser}>logout</button>
            </p>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </div>
        {alert ? <Alert alert={alert} /> : null}
        <Switch>
          <Route path="/login">
            <LoginForm />
          </Route>
          <Route path="/users/:id">
            <User />
          </Route>
          <Route path="/users">
            <Users />
          </Route>
          <Route path="/blogs/:id">
            <Blog />
          </Route>
          <Route path="/">
            {user && <BlogForm />}
            <Blogs />
          </Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;
