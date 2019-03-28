import React from 'react';
import { raindropIcon } from '../svgs/icons';

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
        {this.props.dailyOrHourlyForecast === 'daily' ? (
          <h4>{this.props.dateTime.format('ddd')}</h4>
        ) : (
          ''
        )}
        {this.props.dailyOrHourlyForecast === 'hourly' ? (
          <h4>{this.props.dateTime.format('HH:mm')}</h4>
        ) : (
          ''
        )}

        <canvas id={`forecast-table__icon${this.props.keyId}`} width="48" height="48" />

        <div className="forecast-table__precipitation-container">
          {raindropIcon}
          <p>
            {typeof this.props.precipProbability === 'number'
              ? `${Math.round(this.props.precipProbability)}% `
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
