import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Alert from './components/Alert';
import userServices from './services/users';

import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [blog, setBlog] = useState({ title: '', author: '', url: '' });
  const [alert, setAlert] = useState(null);

  useEffect(() => {
    const getBlogs = async () => {
      const res = await blogService.getAll();
      setBlogs(res.data);
    };
    getBlogs();
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('blog-key');
    if (loggedUser) {
      const user = JSON.parse(loggedUser);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const loginFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await userServices.login(username, password);
      window.localStorage.setItem('blog-key', JSON.stringify(res));
      setUser(res);
      setUserName('');
      setPassword('');
      setAlert({ text: 'Logged in successfully !', type: 'success' });
    } catch (error) {
      setAlert({ text: 'invalid username or password', type: 'error' });
    }
  };

  const blogFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await blogService.createBlog(blog);
      setBlogs(blogs.concat(res.data));
      setAlert({ text: 'Blog addes successfully', type: 'success' });
    } catch (error) {
      setAlert({ text: 'please provide all values', type: 'error' });
    }
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem('blog-key');
    setAlert({ text: 'Logged out ', type: 'success' });
  };
  return (
    <div>
      <h2>blogs</h2>
      {alert ? <Alert alert={alert} /> : null}
      {user ? (
        <div>
          <p>{user.username}</p> <button onClick={logout}>logout</button>
          <BlogForm
            blog={blog}
            setBlog={setBlog}
            blogFormSubmit={blogFormSubmit}
          />
        </div>
      ) : (
        <LoginForm
          username={username}
          password={password}
          setUserName={setUserName}
          setPassword={setPassword}
          onSubmit={loginFormSubmit}
        />
      )}

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
