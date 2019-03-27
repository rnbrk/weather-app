import React from 'react';

const DailyHourlyToggle = ({ onToggleDailyHourly, dailyOrHourlyForecast }) => (
  <div className="daily-hourly-toggle__container">
    {dailyOrHourlyForecast === 'daily' ? (
      <button disabled className="unfocused">
        Daily
      </button>
    ) : (
      <button onClick={onToggleDailyHourly}>Daily</button>
    )}

    {dailyOrHourlyForecast === 'hourly' ? (
      <button disabled className="unfocused">
        Hourly
      </button>
    ) : (
      <button onClick={onToggleDailyHourly}>Hourly</button>
    )}
  </div>
);

export default DailyHourlyToggle;
