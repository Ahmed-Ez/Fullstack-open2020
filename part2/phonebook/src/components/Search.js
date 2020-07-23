import React from 'react';

const Search = ({ filterHandler }) => {
  return (
    <div>
      Search: <input type="text" name="filter" onChange={filterHandler} />
    </div>
  );
};

export default Search;
