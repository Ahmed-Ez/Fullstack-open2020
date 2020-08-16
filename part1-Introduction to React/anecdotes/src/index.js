import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ text, clickHandler }) => (
  <button onClick={clickHandler}>{text}</button>
);

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));

  const nextAnec = () => {
    setSelected(Math.floor(Math.random() * Math.floor(anecdotes.length)));
  };

  const voteAnec = () => {
    const newVotes = [...votes];
    newVotes[selected] += 1;
    setVotes(newVotes);
  };

  return (
    <div>
      <h1>Random Anecdote</h1>
      <p>{anecdotes[selected]}</p>
      <p>has votes: {votes[selected]}</p>
      <Button text="Next Anecdote" clickHandler={nextAnec} />
      <Button text="Vote Anecdote" clickHandler={voteAnec} />
      <h1>Most Voted Anecdote</h1>
      <p>{anecdotes[votes.indexOf(Math.max(...votes))]}</p>
    </div>
  );
};

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));
