import React from 'react';
import moment from 'moment';
import { locationIcon } from '../svgs/icons';

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
          // Skyicon
          <canvas id="weather-today__icon" width="156" height="156" />
        </div>

        <div className="weather-today__summary">
          <h2>{`${this.props.summary}`}</h2>
        </div>
      </div>
    );
  }
}
