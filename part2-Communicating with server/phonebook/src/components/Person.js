import React from 'react';

const Person = ({ person }) => {
  return (
    <div>
      <p>
        Name: {person.name} - Phone:{person.phone}
      </p>
    </div>
  );
};

export default Person;
