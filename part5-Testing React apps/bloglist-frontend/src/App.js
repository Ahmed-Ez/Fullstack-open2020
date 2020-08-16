import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import BlogForm from './components/BlogForm';
import LoginForm from './components/LoginForm';
import Toggleable from './components/Toggleable';
import Alert from './components/Alert';
import userServices from './services/users';

import './index.css';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    const getBlogs = async () => {
      const res = await blogService.getAll();
      setBlogs(sortBlogs(res.data));
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

  const login = async (username, password) => {
    try {
      const res = await userServices.login(username, password);
      window.localStorage.setItem('blog-key', JSON.stringify(res));
      setUser(res);
      setAlert({ text: 'Logged in successfully !', type: 'success' });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    } catch (error) {
      setAlert({ text: 'invalid username or password', type: 'error' });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
  };

  const submitBlog = async (blog) => {
    try {
      const res = await blogService.createBlog(blog);
      setBlogs(blogs.concat(res.data));
      setAlert({ text: 'Blog addes successfully', type: 'success' });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
      blogFormRef.current.toggleVisibility();
    } catch (error) {
      setAlert({ text: 'please provide all values', type: 'error' });
      setTimeout(() => {
        setAlert(null);
      }, 2000);
    }
  };

  const logout = () => {
    setUser(null);
    window.localStorage.removeItem('blog-key');
    setAlert({ text: 'Logged out ', type: 'success' });
    setTimeout(() => {
      setAlert(null);
    }, 2000);
  };

  const likesHandler = async (id, likes) => {
    await blogService.likeBlog(id, likes + 1);
    const index = blogs.findIndex((blog) => blog.id === id);
    const newBlogs = [...blogs];
    newBlogs[index].likes = likes + 1;
    setBlogs(sortBlogs(newBlogs));
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are u sure you want to delete this blog ?')) {
      try {
        await blogService.deleteBlog(id);
        const newBlogs = blogs.filter((blog) => blog.id !== id);
        setBlogs(sortBlogs(newBlogs));
        setAlert({ text: 'blog deleted successfully', type: 'success' });
        setTimeout(() => {
          setAlert(null);
        }, 2000);
      } catch (error) {
        setAlert({ text: 'Blog is already deleted', type: 'error' });
        setTimeout(() => {
          setAlert(null);
        }, 2000);
      }
    }
  };

  const sortBlogs = (blogs) => {
    blogs.sort((a, b) => b.likes - a.likes);
    return blogs;
  };
  return (
    <div>
      <h2>blogs</h2>
      {alert ? <Alert alert={alert} /> : null}
      {user ? (
        <div>
          <p>{user.username}</p> <button onClick={logout}>logout</button>
          <Toggleable buttonLabel={'Add new Blog'} ref={blogFormRef}>
            <BlogForm submitBlog={submitBlog} />
          </Toggleable>
        </div>
      ) : (
        <Toggleable buttonLabel={'login'}>
          <LoginForm login={login} />
        </Toggleable>
      )}

      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          likesHandler={likesHandler}
          deleteHandler={deleteHandler}
        />
      ))}
    </div>
  );
};

export default App;
