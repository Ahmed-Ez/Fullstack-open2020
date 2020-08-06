import React from 'react';
import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };
  return (
    <div>
      <label htmlFor="filter">Filter </label>
      <input onChange={handleChange} name="filter" type="text" />
    </div>
  );
};

export default Filter;
