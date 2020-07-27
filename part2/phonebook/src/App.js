import React, { useState, useEffect } from 'react';
import contactServices from './services/contacts';
import Form from './components/Form';
import People from './components/People';
import Search from './components/Search';
import Message from './components/Message';
import './index.css';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [filteredList, setFilteredList] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    contactServices.getAll().then((persons) => setPersons(persons));
  }, [message]);

  const deleteHandler = (e) => {
    const targetName = persons.find((person) => person.id === e.target.value);
    if (window.confirm(`Delete ${targetName.name} ?`)) {
      contactServices
        .deletePerson(e.target.value)
        .then(() => {})
        .catch((error) => {
          setMessage({
            text: `${targetName.name} has already been deleted`,
            type: 'error',
          });
          setTimeout(() => {
            setMessage('');
          }, 3000);
        });
      setPersons(persons.filter((person) => person.id !== e.target.value));
      if (filteredList)
        setFilteredList(
          filteredList.filter((person) => person.id !== e.target.value)
        );
      setMessage({
        text: `${targetName.name} deleted successfully`,
        type: 'success',
      });
      setTimeout(() => {
        setMessage('');
      }, 3000);
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
            if (filteredList)
              setFilteredList(
                filteredList.map((person) =>
                  person.id === newPerson.id ? newPerson : person
                )
              );
            setMessage({
              text: `${newName} phone Changed successfully`,
              type: 'success',
            });
            setTimeout(() => {
              setMessage('');
            }, 3000);
          })
          .catch((error) => {
            setMessage({
              text: `${newName} has already been deleted`,
              type: 'error',
            });
            setTimeout(() => {
              setMessage('');
            }, 3000);
          });
      }
    } else {
      contactServices
        .addPerson({ name: newName, phone: newPhone })
        .then((person) => {
          setPersons(persons.concat({ name: newName, phone: newPhone }));
          setMessage({
            text: `${newName} added successfully`,
            type: 'success',
          });
          setTimeout(() => {
            setMessage('');
          }, 3000);
        })
        .catch((error) => {
          console.log(error.response.data);
          setMessage({
            text: `${error.response.data.error}`,
            type: 'error',
          });
          setTimeout(() => {
            setMessage('');
          }, 3000);
        });
    }
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Message message={message} />
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
