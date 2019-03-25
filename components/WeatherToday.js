/* eslint-disable react/prop-types */
import React from 'react';

const WeatherToday = ({ temperature, icon, maxTemp, minTemp, cityName, dateTime, summary }) => (
  <div className="weather-today-container">
    <h1>{temperature ? Math.round(temperature) : '..'}</h1>
    <h3>{`[${icon}]`}</h3>
    <h3>{maxTemp && minTemp ? `${Math.round(maxTemp)} / ${Math.round(minTemp)}` : '../..'}</h3>
    <h2>{cityName}</h2>
    <h3>{dateTime}</h3>
    <h3>{`${summary}`}</h3>
  </div>
);

export default WeatherToday;
