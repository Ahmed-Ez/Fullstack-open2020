import React from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { likeBlog, deleteBlog, commentBlog } from '../reducers/blogsReducer';
import { Card, Button, ListGroup, Form, FormControl } from 'react-bootstrap';
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

  const commentHandler = (e) => {
    e.preventDefault();
    dispatch(commentBlog(blog.id, e.target.comment.value));
    e.target.comment.value = '';
  };
  return (
    <div>
      {blog ? (
        <div>
          <Card border="light" className="m-t">
            <Card.Body>
              <Card.Title>{blog.title}</Card.Title>
              <Card.Text className="blockquote-footer">
                <cite title="Source Title">{blog.author}</cite>
              </Card.Text>
              <Card.Link href="#">{blog.url}</Card.Link>
              <Card.Text>
                Likes: {blog.likes}
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => {
                    likesHandler(blog.id, blog.likes);
                  }}
                >
                  like
                </Button>
              </Card.Text>
              <h4>Comments</h4>
              <ListGroup>
                {blog.comments.map((comment) => (
                  <ListGroup.Item key={comment}>{comment}</ListGroup.Item>
                ))}
              </ListGroup>
              <Form inline onSubmit={commentHandler}>
                <FormControl
                  type="text"
                  placeholder="Comment"
                  name="comment"
                  className="mr-sm-2"
                />
                <Button type="submit" variant="outline-info">
                  Submit
                </Button>
              </Form>
              <Button
                variant="danger"
                onClick={() => {
                  deleteHandler(blog.id);
                }}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        </div>
      ) : null}
    </div>
  );
};

export default Blog;
