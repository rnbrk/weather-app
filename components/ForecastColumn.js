/* eslint-disable react/prop-types */
import React from 'react';

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
          {this.props.type === 'daily'
            ? this.props.dateTime.format('hh:mm')
            : this.props.dateTime.format('ddd')}
        </h4>
        <canvas id={`forecast-table__icon${this.props.keyId}`} width="48" height="48" />
        <p>
          {typeof this.props.precipProbability === 'number'
            ? Math.round(this.props.precipProbability)
            : '..'}
          %
          {typeof this.props.precipIntensity === 'number'
            ? Math.round(this.props.precipIntensity)
            : '..'}
          mm
        </p>
      </div>
    );
  }
}
