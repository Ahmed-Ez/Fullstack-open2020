import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Card, ListGroup } from 'react-bootstrap';

const User = () => {
  const userId = useRouteMatch('/users/:id').params.id;
  const user = useSelector((state) =>
    state.users.users.find((user) => user.id === userId)
  );
  return (
    <div>
      {user ? (
        <div>
          <Card border="light" className="m-t">
            <Card.Body>
              <Card.Title>{user.name}</Card.Title>
              <Card.Text>Added Blogs</Card.Text>
              <ListGroup>
                {user.blogs.map((blog) => (
                  <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      ) : null}
    </div>
  );
};

export default User;
