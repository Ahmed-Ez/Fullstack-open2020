import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';

const User = () => {
  const userId = useRouteMatch('/users/:id').params.id;
  const user = useSelector((state) =>
    state.users.users.find((user) => user.id === userId)
  );
  console.log(userId, user);
  return (
    <div>
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <h3>Added Blogs</h3>
          <ul>
            {user.blogs.map((blog) => (
              <li key={blog.id}>{blog.title}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default User;
