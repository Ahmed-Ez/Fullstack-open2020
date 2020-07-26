import React from 'react';
import Person from './Person';

const People = ({ persons, deleteHandler }) => {
  return (
    <div>
      <h3>Numbers</h3>
      {persons.map((person) => (
        <div key={person.name}>
          <Person person={person} />
          <button value={person.id} onClick={deleteHandler}>
            delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default People;
