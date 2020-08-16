import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initUsers } from '../reducers/usersReducer';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);
  return (
    <div>
      <h2>Users</h2>
      {users.map((user) => (
        <Card key={user.id}>
          <Card.Body>
            <Link to={`/users/${user.id}`}>{user.name}</Link>
            {' ' + user.blogs.length}
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Users;
