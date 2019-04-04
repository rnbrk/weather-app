import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { locationIcon } from '../svgs/icons';

export default class WeatherToday extends React.Component {
  componentDidMount() {
    this.componentDidUpdate();
  }

  componentDidUpdate() {
    const { icon, updateSkycon } = this.props;
    updateSkycon('weather-today__icon', icon);
  }

  render() {
    const { cityName, maxTemp, minTemp, summary, temperature, time } = this.props;
    return (
      <div className="weather-today">
        <div className="weather-today__datetime-city-container">
          {locationIcon}
          <h3>{cityName}</h3>
          <h4 className="unfocused">{time && moment.unix(time).format('ddd DD MMMM HH:mm')}</h4>
        </div>

        <div className="weather-today__temperature-and-icon-container">
          <div className="weather-today__temperature-container">
            <h1>{temperature ? `${Math.round(temperature)}\u2103` : '..'}</h1>
            <h3>
              {maxTemp && minTemp
                ? `${Math.round(maxTemp)}\u00B0 / ${Math.round(minTemp)}\u00B0`
                : '../..'}
            </h3>
          </div>

          <canvas id="weather-today__icon" width="156" height="156" />
        </div>

        <div className="weather-today__summary">
          <h2>{`${summary}`}</h2>
        </div>
      </div>
    );
  }
}

WeatherToday.propTypes = {
  cityName: PropTypes.string,
  icon: PropTypes.string,
  maxTemp: PropTypes.number,
  minTemp: PropTypes.number,
  summary: PropTypes.string,
  temperature: PropTypes.number,
  time: PropTypes.number,
  updateSkycon: PropTypes.func
};

WeatherToday.defaultProps = {
  cityName: '',
  icon: '',
  maxTemp: undefined,
  minTemp: undefined,
  summary: '',
  time: undefined,
  temperature: undefined,
  updateSkycon() {}
};
