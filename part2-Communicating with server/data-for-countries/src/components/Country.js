import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({ country, show }) => {
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather, setWeather] = useState({});
  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`
      )
      .then((res) =>
        setWeather({
          temperature: res.data.current.temperature,
          icon: res.data.current.weather_icons,
          wind_speed: res.data.current.wind_speed,
          wind_dir: res.data.current.wind_dir,
        })
      );

    // eslint-disable-next-line
  }, []);
  if (show) {
    return (
      <div>
        <h1>{country.name}</h1>
        <p>Capital: {country.capital}</p>
        <p>Poplation: {country.population}</p>
        <h3>Languages</h3>
        <ul>
          {country.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>
        <img src={country.flag} alt="" width="200px" height="150px" />
        <h2>Weather in {country.capital}</h2>
        <p>Temperature: {weather.temperature} Celcius</p>
        <img src={weather.icon} alt="" />
        <p>Wind: {`${weather.wind_speed} mph direction ${weather.wind_dir}`}</p>
      </div>
    );
  } else return <p>{country.name}</p>;
};

export default Country;
