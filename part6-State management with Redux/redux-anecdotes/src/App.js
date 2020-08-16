import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { initState } from './reducers/anecdoteReducer';
import AnecdotesList from './components/AnecdotesList';
import AnecdotesForm from './components/AnecdotesForm';
import Notification from './components/Notification';
import Filter from './components/Filter';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initState());
  }, [dispatch]);
  return (
    <div>
      <h1>Anecdotes</h1>
      <Notification />
      <Filter />
      <AnecdotesList />
      <AnecdotesForm />
    </div>
  );
};

export default App;
