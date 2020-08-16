import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterd, setFiltered] = useState([]);

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((res) => {
      setCountries(res.data);
    });
  }, []);

  const inputHandler = (e) => {
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFiltered(filteredCountries);
  };

  return (
    <div>
      <div>
        Find Countries <input type="text" onChange={inputHandler} />
      </div>
      <Countries countries={filterd} />
    </div>
  );
};

export default App;
