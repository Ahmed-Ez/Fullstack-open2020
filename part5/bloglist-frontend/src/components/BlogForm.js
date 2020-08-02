import React from 'react';

const BlogForm = ({ blog, setBlog, blogFormSubmit }) => {
  const { title, author, url } = blog;
  return (
    <div>
      <h2>Add new Blog</h2>
      <form onSubmit={blogFormSubmit}>
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
