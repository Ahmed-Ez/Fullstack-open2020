import React from 'react';
import { connect } from 'react-redux';
import { create } from '../reducers/anecdoteReducer';
import { addNotification } from '../reducers/notificationReducer';
const AnecdotesForm = (props) => {
  const addAnecdote = async (e) => {
    e.preventDefault();
    const content = e.target.anecdote.value;
    e.target.anecdote.value = '';
    props.create({ content, votes: 0 });
    props.addNotification(`Anecdote ${content} added`, 5);
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

const mapDispatchToProps = { create, addNotification };
const connectedForm = connect(null, mapDispatchToProps)(AnecdotesForm);
export default connectedForm;
