import React, { useState } from 'react';
import { addBlog } from '../reducers/blogsReducer';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
const BlogForm = () => {
  const [blog, setBlog] = useState({ title: '', author: '', url: '' });
  const { title, author, url } = blog;
  const dispatch = useDispatch();
  const history = useHistory();
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addBlog(blog));
    setBlog({ title: '', author: '', url: '' });
    history.push('/');
  };
  return (
    <div>
      <h3>Add new Blog</h3>
      <Form onSubmit={onSubmit}>
        <Form.Group controlId="formBasicTitle">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={title}
            onChange={(e) =>
              setBlog({ ...blog, [e.target.name]: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="formBasicAuthor">
          <Form.Label>Author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={author}
            onChange={(e) =>
              setBlog({ ...blog, [e.target.name]: e.target.value })
            }
          />
        </Form.Group>
        <Form.Group controlId="formBasicUrl">
          <Form.Label>Url</Form.Label>
          <Form.Control
            type="text"
            name="url"
            value={url}
            onChange={(e) =>
              setBlog({ ...blog, [e.target.name]: e.target.value })
            }
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default BlogForm;
