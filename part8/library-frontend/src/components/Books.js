import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { ALL_BOOKS, BOOKS_BY_GENRE } from '../queries';

const Books = (props) => {
  const [books, setBooks] = useState([]);
  const [getBooks, result] = useLazyQuery(ALL_BOOKS);
  const [getBooksByGenre, genreResult] = useLazyQuery(BOOKS_BY_GENRE);

  useEffect(() => {
    getBooks();
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result.data]);

  useEffect(() => {
    if (genreResult.data) {
      setBooks(genreResult.data.allBooks);
    }
  }, [genreResult.data]);
  if (!props.show) {
    return null;
  }

  const filterHandler = (e) => {
    getBooksByGenre({ variables: { genre: e.target.name } });
  };
  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button name="refactoring" onClick={filterHandler}>
        Refeactoring
      </button>
      <button name="comedy" onClick={filterHandler}>
        Comedy
      </button>
      <button name="design" onClick={filterHandler}>
        Design
      </button>
      <button name="classic" onClick={filterHandler}>
        Classic
      </button>
      <button name="crime" onClick={filterHandler}>
        Crime
      </button>
      <button name="patterns" onClick={filterHandler}>
        Patterns
      </button>
    </div>
  );
};

export default Books;
