import React, { useState, useEffect } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { ALL_AUTHORS, SET_YEAR } from '../queries';

const Authors = (props) => {
  const results = useQuery(ALL_AUTHORS);
  const [selected, setSelected] = useState('');
  const [changeYear] = useMutation(SET_YEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });
  let authors = [];

  if (!props.show) {
    return null;
  }

  if (results.loading) return <div>loading ...</div>;
  authors = results.data.allAuthors;

  const setYear = (e) => {
    e.preventDefault();
    changeYear({
      variables: {
        name: e.target.name.value,
        year: Number(e.target.year.value),
      },
    });
  };

  const handleSelect = (e) => {
    setSelected(e.target.value);
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Set birth year</h3>
      <form onSubmit={setYear}>
        <select name="name" value={selected} onChange={handleSelect}>
          {authors.map((author) => (
            <option key={author.name} value={author.name}>
              {author.name}
            </option>
          ))}
        </select>
        <label htmlFor="year">Year</label>
        <input type="number" name="year" />
        <button>Set</button>
      </form>
    </div>
  );
};

export default Authors;
