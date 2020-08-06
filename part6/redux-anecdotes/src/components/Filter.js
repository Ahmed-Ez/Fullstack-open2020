import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = (props) => {
  const handleChange = (e) => {
    props.setFilter(e.target.value);
  };
  return (
    <div>
      <label htmlFor="filter">Filter </label>
      <input onChange={handleChange} name="filter" type="text" />
    </div>
  );
};

const mapDispatchToProps = {
  setFilter,
};
const connectedFilter = connect(null, mapDispatchToProps)(Filter);
export default connectedFilter;
