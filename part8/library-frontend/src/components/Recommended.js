import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';
import { BOOKS_BY_GENRE } from '../queries';

const Recommended = ({ show, genre }) => {
  const [books, setBooks] = useState([]);
  const [getBooks, result] = useLazyQuery(BOOKS_BY_GENRE);
  useEffect(() => {
    getBooks({ variables: { genre: genre } });
    if (result.data) setBooks(result.data.allBooks);
  }, [result.data]);

  if (!show) return null;
  return (
    <div>
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
    </div>
  );
};

export default Recommended;
