import React from 'react';
import { connect } from 'react-redux';
import { vote } from '../reducers/anecdoteReducer';
import { addNotification } from '../reducers/notificationReducer';

const AnecdotesList = (props) => {
  const orderedAnecdotes = props.anecdotes.sort((a, b) => {
    return b.votes - a.votes;
  });
  const makeVote = (anecdote) => {
    props.vote(anecdote);
    props.addNotification(`You voted for ${anecdote.content}`, 5);
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

const mapStateToProps = (state) => {
  if (state.filter === null || state.filter === '')
    return { anecdotes: state.anecdotes };
  return {
    anecdotes: state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    ),
  };
};

const mapDispatchToProps = {
  vote,
  addNotification,
};

const connectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdotesList);
export default connectedAnecdotes;
