import React, { Fragment } from 'react';
import Person from './Person';

const People = ({ persons, deleteHandler }) => {
  return (
    <div>
      <h3>Numbers</h3>
      {persons.map((person) => (
        <Fragment key={person.name}>
          <Person person={person} />
          <button value={person.id} onClick={deleteHandler}>
            delete
          </button>
        </Fragment>
      ))}
    </div>
  );
};

export default People;
