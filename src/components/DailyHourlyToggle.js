import React from 'react';
import PropTypes from 'prop-types';

const DailyHourlyToggle = ({ onToggleDailyHourly, dailyOrHourlyForecast }) => (
  <div className="daily-hourly-toggle__container">
    {dailyOrHourlyForecast === 'daily' ? (
      <button tabIndex="0" type="button" disabled className="selected daily-hourly-toggle">
        Daily
      </button>
    ) : (
      <button
        tabIndex="0"
        type="button"
        onClick={onToggleDailyHourly}
        className="unfocused daily-hourly-toggle"
      >
        Daily
      </button>
    )}

    {dailyOrHourlyForecast === 'hourly' ? (
      <button tabIndex="0" type="button" disabled className="selected daily-hourly-toggle">
        Hourly
      </button>
    ) : (
      <button
        tabIndex="0"
        type="button"
        onClick={onToggleDailyHourly}
        className="unfocused daily-hourly-toggle"
      >
        Hourly
      </button>
    )}
  </div>
);

DailyHourlyToggle.propTypes = {
  onToggleDailyHourly: PropTypes.func.isRequired,
  dailyOrHourlyForecast: PropTypes.string.isRequired
};

export default DailyHourlyToggle;
