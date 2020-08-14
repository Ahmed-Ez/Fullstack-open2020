import React, { useState, useEffect } from 'react';
import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Login from './components/Login';
import Recommended from './components/Recommended';
import { useLazyQuery, useSubscription, useApolloClient } from '@apollo/client';
import { GET_USER, BOOK_ADDED, ALL_BOOKS, BOOKS_BY_GENRE } from './queries';

const App = () => {
  const [page, setPage] = useState('authors');
  const [user, setUser] = useState(null);
  const [getUser, result] = useLazyQuery(GET_USER);
  const client = useApolloClient();

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`BOOK ADDED ${subscriptionData.data.bookAdded.title} `);
      const dataInStore = client.readQuery({
        query: ALL_BOOKS,
      });
      client.writeQuery({
        query: ALL_BOOKS,
        data: {
          ...dataInStore,
          allBooks: [...dataInStore.allBooks, subscriptionData.data.bookAdded],
        },
      });
      subscriptionData.data.bookAdded.genres.forEach((genre) => {
        try {
          const genreDataInStore = client.readQuery({
            query: BOOKS_BY_GENRE,
            variables: { genre: genre },
          });
          client.writeQuery({
            query: BOOKS_BY_GENRE,
            variables: { genre: genre },
            data: {
              ...genreDataInStore,
              allBooks: [
                ...genreDataInStore.allBooks,
                subscriptionData.data.bookAdded,
              ],
            },
          });
        } catch (error) {
          console.log(error);
        }
      });
    },
  });

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
