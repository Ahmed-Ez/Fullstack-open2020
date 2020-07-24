import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from './components/Form';
import People from './components/People';
import Search from './components/Search';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filteredList, setFilteredList] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then((res) => setPersons(res.data));
  }, []);

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
