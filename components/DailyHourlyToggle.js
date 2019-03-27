import React from 'react';

const DailyHourlyToggle = ({ onToggleDailyHourly, dailyOrHourlyForecast }) => (
  <div className="daily-hourly-toggle__container">
    {dailyOrHourlyForecast === 'daily' ? (
      <button disabled className="selected">
        Daily
      </button>
    ) : (
      <button onClick={onToggleDailyHourly} className="unfocused">
        Daily
      </button>
    )}

    {dailyOrHourlyForecast === 'hourly' ? (
      <button disabled className="selected">
        Hourly
      </button>
    ) : (
      <button onClick={onToggleDailyHourly} className="unfocused">
        Hourly
      </button>
    )}
  </div>
);

export default DailyHourlyToggle;
