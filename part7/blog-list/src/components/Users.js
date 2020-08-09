import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initUsers } from '../reducers/usersReducer';
import { Link } from 'react-router-dom';

const Users = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  useEffect(() => {
    dispatch(initUsers());
  }, [dispatch]);
  return (
    <div>
      {users.map((user) => (
        <p key={user.id}>
          <Link to={`/users/${user.id}`}>{user.name}</Link>
          {' ' + user.blogs.length}
        </p>
      ))}
    </div>
  );
};

export default Users;
