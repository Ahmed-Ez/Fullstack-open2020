import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { initState } from '../reducers/blogsReducer';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

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
      <h2>Blogs</h2>
      {blogs.map((blog) => (
        <Card key={blog.id}>
          <Card.Body>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Blogs;
