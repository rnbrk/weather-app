import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { raindropIcon } from '../svgs/icons';

export default class ForecastColumn extends React.Component {
  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const { icon, canvasId, updateSkycon } = this.props;
    updateSkycon(`forecast-table__icon${canvasId}`, icon);
  }

  render() {
    const {
      dailyOrHourlyForecast,
      dateTime,
      canvasId,
      precipIntensity,
      precipProbability
    } = this.props;

    return (
      <div className="forecast-table__column">
        {dailyOrHourlyForecast === 'daily' ? <h4>{dateTime.format('ddd')}</h4> : ''}
        {dailyOrHourlyForecast === 'hourly' ? <h4>{dateTime.format('HH:mm')}</h4> : ''}

        <canvas id={`forecast-table__icon${canvasId}`} width="48" height="48" />

        <div className="forecast-table__precipitation-container">
          {raindropIcon}
          <p>
            {typeof precipProbability === 'number' ? `${Math.round(precipProbability)}% ` : '..'}
            {typeof precipIntensity === 'number' && Math.round(precipProbability) > 0
              ? `${Math.round(precipIntensity)}mm`
              : ''}
          </p>
        </div>
      </div>
    );
  }
}

ForecastColumn.propTypes = {
  dailyOrHourlyForecast: PropTypes.string.isRequired,
  dateTime: PropTypes.instanceOf(moment).isRequired,
  icon: PropTypes.string.isRequired,
  precipIntensity: PropTypes.number,
  precipProbability: PropTypes.number,
  updateSkycon: PropTypes.func
};

ForecastColumn.defaultProps = {
  precipIntensity: 0,
  precipProbability: 0,
  updateSkycon() {}
};
