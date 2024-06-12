
import React, { useState } from 'react';
import './Weather.css'; // Import your CSS file
import axios from 'axios';

const WeatherApp = () => {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState('');

  const getWeatherbyCity = async () => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=815756920b17df0834b4a228de35b6a1&units=metric`);
      setWeather(response.data);
    } catch (error) {
      console.error('Failed to fetch weather', error);
      setWeather(null);
    }
  };

  const renderDate = () => {
    return new Date().toLocaleDateString();
  };

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="input-wrapper">
        <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter City Name"
        />
        <button onClick={getWeatherbyCity}>Search</button>
      </div>

      {weather ? (
        <div className="content">
          <div className="location">
            <h2>{weather.name} <span>({weather.sys.country})</span></h2>
          </div>
          <p className="datetext">{renderDate()}</p>

          <div className="weatherdesc">
            <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} />
            <h3>{weather.weather[0].description}</h3>
          </div>

          <div className="tempstats">
            <h1>{weather.main.temp} <span>&deg;C</span></h1>
            <h3>Feels like {weather.main.feels_like} <span>&deg;C</span></h3>
          </div>

          <div className="windstats">
            <h3>Wind is {weather.wind.speed} m/s at {weather.wind.deg}&deg;</h3>
          </div>
        </div>
      ) : (
        <div className="content">
          <h4>No Data found</h4>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;


 