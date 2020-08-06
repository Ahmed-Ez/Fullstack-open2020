import React from 'react';
import { useDispatch } from 'react-redux';
import { create } from '../reducers/anecdoteReducer';
import { addNotification } from '../reducers/notificationReducer';
const AnecdotesForm = () => {
  const dispatch = useDispatch();

  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    dispatch(create({ content, votes: 0 }));
    dispatch(addNotification(`Anecdote ${content} added`, 5));
  };
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  );
};

export default AnecdotesForm;
