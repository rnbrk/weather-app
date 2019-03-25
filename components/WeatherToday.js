/* eslint-disable react/prop-types */
import React from 'react';
export default class WeatherToday extends React.Component {
  componentDidUpdate() {
    this.props.updateSkycon('weather-today__icon', this.props.icon);
  }

  render() {
    return (
      <div className="weather-today-container">
        <h1>{this.props.temperature ? Math.round(this.props.temperature) : '..'}</h1>
        <canvas id="weather-today__icon" width="192" height="192" />
        <h3>
          {this.props.maxTemp && this.props.minTemp
            ? `${Math.round(this.props.maxTemp)} / ${Math.round(this.props.minTemp)}`
            : '../..'}
        </h3>
        <h2>{this.props.cityName}</h2>
        <h3>{this.props.dateTime}</h3>
        <h3>{`${this.props.summary}`}</h3>
      </div>
    );
  }
}
