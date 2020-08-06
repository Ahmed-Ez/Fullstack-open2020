import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { addNotification } from '../reducers/notificationReducer';

const AnecdotesList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === null || state.filter === '') return state.anecdotes;
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });
  const orderedAnecdotes = anecdotes.sort((a, b) => {
    return b.votes - a.votes;
  });
  const dispatch = useDispatch();
  const makeVote = (anecdote) => {
    dispatch(vote(anecdote));
    dispatch(addNotification(`You voted for ${anecdote.content}`, 5));
  };

  return (
    <div>
      {orderedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => makeVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdotesList;
