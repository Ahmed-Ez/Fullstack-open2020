import React, { useState } from 'react';
const Blog = ({ blog, likesHandler, deleteHandler }) => {
  const [visible, setVisible] = useState(false);
  const toggleVisibility = () => setVisible(!visible);

  return (
    <div>
      {visible ? (
        <div className="blog">
          <p>Title: {blog.title}</p>
          <p>Author: {blog.author}</p>
          <p>Url: {blog.url}</p>
          <p>
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
      ) : (
        <div className="blog">{blog.title}</div>
      )}
      <button onClick={toggleVisibility}>{visible ? 'Hide' : 'View'}</button>
    </div>
  );
};

export default Blog;
