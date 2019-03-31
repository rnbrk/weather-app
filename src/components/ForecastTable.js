import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import ForecastColumn from './ForecastColumn';

const ForecastTable = ({
  amountOfForecastColumns,
  dailyOrHourlyForecast,
  dailyOrHourlyWeatherData,
  updateSkycon
}) => (
  <div className="forecast-table__table">
    {dailyOrHourlyWeatherData
      ? dailyOrHourlyWeatherData
          .slice(0, amountOfForecastColumns)
          .map(item => (
            <ForecastColumn
              {...item}
              key={uuid()}
              canvasId={uuid()}
              dailyOrHourlyForecast={dailyOrHourlyForecast}
              updateSkycon={updateSkycon}
            />
          ))
      : '...'}
  </div>
);

ForecastTable.propTypes = {
  amountOfForecastColumns: PropTypes.number.isRequired,
  dailyOrHourlyForecast: PropTypes.string.isRequired,
  dailyOrHourlyWeatherData: PropTypes.arrayOf(PropTypes.object),
  updateSkycon: PropTypes.func
};

ForecastTable.defaultProps = {
  dailyOrHourlyForecast: 'Daily',
  updateSkycon() {}
};

export default ForecastTable;
