import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initState } from '../reducers/blogsReducer';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const blogs = useSelector((state) =>
    state.blogs.sort((a, b) => b.likes - a.likes)
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initState());
  }, [dispatch]);
  return (
    <div>
      {blogs.map((blog) => (
        <p key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
        </p>
      ))}
    </div>
  );
};

export default Blogs;
