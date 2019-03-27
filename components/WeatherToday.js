/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';
export default class WeatherToday extends React.Component {
  componentDidUpdate() {
    this.props.updateSkycon('weather-today__icon', this.props.icon);
  }

  render() {
    return (
      <div className="weather-today">
        <div className="weather-today__datetime-city-container">
          <h3>{this.props.cityName}</h3>
          <h4 className="unfocused">
            {this.props.time && moment.unix(this.props.time).format('ddd DD MMMM HH:mm')}
          </h4>
        </div>

        <div className="weather-today__temperature-and-icon-container">
          <div className="weather-today__temperature-container">
            <h1>{this.props.temperature ? `${Math.round(this.props.temperature)}` : '..'}</h1>
            <h3>
              {this.props.maxTemp && this.props.minTemp
                ? `${Math.round(this.props.maxTemp)} / ${Math.round(this.props.minTemp)}`
                : '../..'}
            </h3>
          </div>
          <canvas id="weather-today__icon" width="156" height="156" />
        </div>

        <h2>{`${this.props.summary}`}</h2>
      </div>
    );
  }
}
