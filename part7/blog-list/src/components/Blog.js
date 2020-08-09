import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { likeBlog, deleteBlog } from '../reducers/blogsReducer';
const Blog = () => {
  const blogId = useRouteMatch('/blogs/:id').params.id;
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === blogId)
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const likesHandler = async (id, likes) => {
    dispatch(likeBlog(id, likes + 1));
  };

  const deleteHandler = async (id) => {
    if (window.confirm('Are u sure you want to delete this blog ?')) {
      dispatch(deleteBlog(id));
      history.push('/');
    }
  };
  return (
    <div>
      {blog ? (
        <div className="blog">
          <p className="title">Title: {blog.title}</p>
          <p className="author">Author: {blog.author}</p>
          <p className="url">Url: {blog.url}</p>
          <p className="likes">
            Likes:
            {blog.likes}
            <button
              onClick={() => {
                likesHandler(blog.id, blog.likes);
              }}
            >
              like
            </button>
          </p>
          <button
            onClick={() => {
              deleteHandler(blog.id);
            }}
          >
            Delete
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
