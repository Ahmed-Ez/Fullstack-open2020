import React, { useState, useEffect } from 'react';
import contactServices from './services/contacts';
import Form from './components/Form';
import People from './components/People';
import Search from './components/Search';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filteredList, setFilteredList] = useState(null);

  useEffect(() => {
    contactServices.getAll().then((persons) => setPersons(persons));
  }, []);

  const deleteHandler = (e) => {
    const targetName = persons.find((person) => person.id == e.target.value);
    if (window.confirm(`Delete ${targetName.name} ?`)) {
      contactServices.deletePerson(e.target.value);
      setPersons(persons.filter((person) => person.id != e.target.value));
      setFilteredList(
        filteredList.filter((person) => person.id != e.target.value)
      );
    }
  };

  const inputHandler = (e) => {
    if (e.target.name === 'NewName') setNewName(e.target.value);
    else if (e.target.name === 'NewPhone') setNewPhone(e.target.value);
  };

  const filterHandler = (e) => {
    if (e.target.value === '') setFilteredList(null);
    else {
      setFilteredList(
        persons.filter((person) =>
          person.name.toLowerCase().includes(e.target.value.toLowerCase())
        )
      );
    }
  };

  const formHandler = (e) => {
    e.preventDefault();
    setNewName('');
    setNewPhone('');
    const exists = persons.find((person) => person.name === newName);
    if (exists) {
      if (
        window.confirm(`${newName} already exists in the phonebook would u like to 
      replace the old number with new one ?`)
      ) {
        contactServices
          .updatePerson(exists.id, {
            name: newName,
            phone: newPhone,
          })
          .then((newPerson) => {
            setPersons(
              persons.map((person) =>
                person.id === newPerson.id ? newPerson : person
              )
            );
            setFilteredList(
              filteredList.map((person) =>
                person.id === newPerson.id ? newPerson : person
              )
            );
          });
      }
    } else {
      contactServices
        .addPerson({ name: newName, phone: newPhone })
        .then((person) => setPersons(persons.concat([person])));
    }
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
      <People
        persons={filteredList ? filteredList : persons}
        deleteHandler={deleteHandler}
      />
    </div>
  );
};

export default App;
