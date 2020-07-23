import React, { useState } from 'react';
import Form from './components/Form';
import People from './components/People';
import Search from './components/Search';

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Ahmed Ezzat', phone: '111-1111-111' },
    { name: 'Arto Hellas', phone: '040-123456' },
    { name: 'Ada Lovelace', phone: '39-44-5323523' },
    { name: 'Dan Abramov', phone: '12-43-234345' },
    { name: 'Mary Poppendieck', phone: '39-23-6423122' },
  ]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filteredList, setFilteredList] = useState(null);

  const inputHandler = (e) => {
    if (e.target.name === 'NewName') setNewName(e.target.value);
    else if (e.target.name === 'NewPhone') setNewPhone(e.target.value);
  };

  const filterHandler = (e) => {
    setFilteredList(
      persons.filter((person) =>
        person.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const formHandler = (e) => {
    e.preventDefault();
    setNewName('');
    setNewPhone('');
    const exists = persons.find((person) => person.name === newName);
    if (exists) alert(`${newName} Already Exists !`);
    else setPersons(persons.concat({ name: newName, phone: newPhone }));
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Search filterHandler={filterHandler} />
      <Form
        formHandler={formHandler}
        inputHandler={inputHandler}
        name={newName}
        phone={newPhone}
      />
      <People persons={filteredList ? filteredList : persons} />
    </div>
  );
};

export default App;
