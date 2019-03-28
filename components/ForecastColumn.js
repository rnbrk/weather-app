/* eslint-disable react/prop-types */
import React from 'react';

const raindropIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="raindrop-icon"
    width="12"
    height="12"
    viewBox="0 0 24 24"
  >
    <path
      fill="#ffffff"
      d="M12 3.571c3.658 5.437 6 9.223 6 12.503 0 3.268-2.691 5.926-6 5.926s-6-2.658-6-5.925c0-3.281 2.341-7.067 6-12.504zm0-3.571c-4.87 7.197-8 11.699-8 16.075 0 4.378 3.579 7.925 8 7.925s8-3.547 8-7.925c0-4.376-3.13-8.878-8-16.075z"
    />
  </svg>
);

export default class ForecastColumn extends React.Component {
  componentDidMount() {
    this.props.updateSkycon(`forecast-table__icon${this.props.keyId}`, this.props.icon);
  }

  componentDidUpdate() {
    this.props.updateSkycon(`forecast-table__icon${this.props.keyId}`, this.props.icon);
  }
  render() {
    return (
      <div className="forecast-table__column">
        <h4>
          {this.props.dailyOrHourlyForecast === 'daily'
            ? this.props.dateTime.format('ddd')
            : this.props.dateTime.format('HH:mm')}
        </h4>
        <canvas id={`forecast-table__icon${this.props.keyId}`} width="48" height="48" />
        <div className="forecast-table__precipitation-container">
          {raindropIcon}
          <p>
            {typeof this.props.precipProbability === 'number'
              ? `${Math.round(this.props.precipProbability)}%`
              : '..'}
            {typeof this.props.precipIntensity === 'number' &&
            Math.round(this.props.precipProbability) > 0
              ? `${Math.round(this.props.precipIntensity)}mm`
              : ''}
          </p>
        </div>
      </div>
    );
  }
}
