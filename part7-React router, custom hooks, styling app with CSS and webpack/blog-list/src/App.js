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
import { Route, Switch, Link, useHistory } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';

const App = () => {
  const alert = useSelector((state) => state.alert);
  const user = useSelector((state) => state.users.loggedUser);
  const dispatch = useDispatch();
  const history = useHistory();
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
    dispatch(setAlert({ text: 'Logged out ', type: 'info' }));
  };

  return (
    <div className="container">
      <Navbar bg="light" expand="lg" className="justify-content-between">
        <Navbar.Brand href="#home">Blog-List</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto ">
            <Nav.Link href="#" as="span">
              <Link to="/">Blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/users">Users</Link>
            </Nav.Link>
          </Nav>
          {user ? (
            <Navbar.Text>
              Signed in as:
              {'  ' + user.username}
              <Button variant="link" onClick={logoutUser}>
                Logout
              </Button>
            </Navbar.Text>
          ) : (
            <Link to="/login">Login</Link>
          )}
        </Navbar.Collapse>
      </Navbar>

      {/* NAVBARCODE */}
      {alert ? <Alert alert={alert} /> : null}
      <Switch>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/create">
          <BlogForm />
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
          <Blogs />
          {user && (
            <Button variant="info" onClick={() => history.push('/create')}>
              Add New Blog
            </Button>
          )}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
