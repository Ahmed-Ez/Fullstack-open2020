import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import Recommended from './components/Recommended';
import { useLazyQuery } from '@apollo/client';
import { GET_USER } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [user, setUser] = useState(null);
  const [getUser, result] = useLazyQuery(GET_USER);

  useEffect(() => {
    getUser();
    if (result.data) {
      if (result.data.me) {
        setUser({
          username: result.data.me.username,
          favouriteGenre: result.data.me.favouriteGenre,
        });
      }
    }
  }, [result.data]); // eslint-disable-line
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {user ? (
          <div>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommended')}>Recommended</button>
            <button
              onClick={() => {
                localStorage.removeItem('library-token');
                setUser(null);
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <button onClick={() => setPage('login')}>Login</button>
        )}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <Login show={page === 'login'} setUser={setUser} setPage={setPage} />
      {user && (
        <Recommended
          show={page === 'recommended'}
          genre={user.favouriteGenre}
        />
      )}
    </div>
  );
};

export default App;
