import React from 'react';
import Person from './Person';

const People = ({ persons }) => {
  return (
    <div>
      <h3>Numbers</h3>
      {persons.map((person) => (
        <Person key={person.name} person={person} />
      ))}
    </div>
  );
};

export default People;
