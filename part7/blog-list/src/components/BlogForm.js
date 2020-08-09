import React, { useState } from 'react';
import { addBlog } from '../reducers/blogsReducer';
import { useDispatch } from 'react-redux';
const BlogForm = () => {
  const [blog, setBlog] = useState({ title: '', author: '', url: '' });
  const { title, author, url } = blog;
  const dispatch = useDispatch();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addBlog(blog));
    setBlog({ title: '', author: '', url: '' });
  };
  return (
    <div>
      <h2>Add new Blog</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="title">title</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) =>
              setBlog({ ...blog, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="author">author</label>
          <input
            type="text"
            name="author"
            value={author}
            onChange={(e) =>
              setBlog({ ...blog, [e.target.name]: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="url">url</label>
          <input
            type="text"
            name="url"
            value={url}
            onChange={(e) =>
              setBlog({ ...blog, [e.target.name]: e.target.value })
            }
          />
        </div>
        <button>submit</button>
      </form>
    </div>
  );
};

export default BlogForm;
