import React, { useState, useEffect } from 'react';
import Country from './Country';

const Countries = ({ countries }) => {
  const [show, setShow] = useState([]);
  useEffect(() => {
    setShow(Array(countries.length).fill(false));
  }, [countries]);

  if (!countries || countries.length === 0) return <p></p>;
  if (countries.length > 10) return <p>Too many matches</p>;
  if (countries.length <= 10 && countries.length > 1) {
    return (
      <div>
        {countries.map((country, index) => (
          <div key={country.name}>
            <Country country={country} show={show[index]} />
            <button
              onClick={() => {
                let newShow = [...show];
                newShow[index] = !newShow[index];
                setShow(newShow);
              }}
            >
              {show[index] ? 'Hide' : 'Show'}
            </button>
          </div>
        ))}
      </div>
    );
  }
  if (countries.length === 1)
    return <Country country={countries[0]} show={true} />;
};

export default Countries;
