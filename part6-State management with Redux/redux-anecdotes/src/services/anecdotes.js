import axios from 'axios';

const getAll = async () => {
  const res = await axios.get('http://localhost:3001/anecdotes');
  return res.data;
};

const addAnecdote = async (anecdote) => {
  const res = await axios.post('http://localhost:3001/anecdotes', anecdote);
  return res.data;
};

const voteForAnecdote = async (anecdote) => {
  const res = await axios.put(
    `http://localhost:3001/anecdotes/${anecdote.id}`,
    anecdote
  );
  return res.data;
};

export default { getAll, addAnecdote, voteForAnecdote };
