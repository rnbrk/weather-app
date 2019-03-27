/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';

const locationIcon = (
  <svg
    className="weather-today__location-icon"
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
  >
    <path
      fill="#ffffff"
      d="M12 0c-4.198 0-8 3.403-8 7.602 0 4.198 3.469 9.21 8 16.398 4.531-7.188 8-12.2 8-16.398 0-4.199-3.801-7.602-8-7.602zm0 11c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3 3z"
    />
  </svg>
);

export default class WeatherToday extends React.Component {
  componentDidUpdate() {
    this.props.updateSkycon('weather-today__icon', this.props.icon);
  }

  render() {
    return (
      <div className="weather-today">
        <div className="weather-today__datetime-city-container">
          {locationIcon}
          <h3>{this.props.cityName}</h3>
          <h4 className="unfocused">
            {this.props.time && moment.unix(this.props.time).format('ddd DD MMMM HH:mm')}
          </h4>
        </div>

        <div className="weather-today__temperature-and-icon-container">
          <div className="weather-today__temperature-container">
            <h1>{this.props.temperature ? `${Math.round(this.props.temperature)}\u2103` : '..'}</h1>
            <h3>
              {this.props.maxTemp && this.props.minTemp
                ? `${Math.round(this.props.maxTemp)}\u00B0 / ${Math.round(
                    this.props.minTemp
                  )}\u00B0`
                : '../..'}
            </h3>
          </div>
          <canvas id="weather-today__icon" width="156" height="156" />
        </div>
        <div className="weather-today__summary">
          <h2>{`${this.props.summary}`}</h2>
        </div>
      </div>
    );
  }
}
