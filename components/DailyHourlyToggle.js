import React from 'react';

const DailyHourlyToggle = ({ onToggleDailyHourly, dailyOrHourlyForecast }) => (
  <div className="daily-hourly-toggle__container">
    {dailyOrHourlyForecast === 'daily' ? (
      <button disabled>Daily</button>
    ) : (
      <button onClick={onToggleDailyHourly}>Daily</button>
    )}

    {dailyOrHourlyForecast === 'hourly' ? (
      <button disabled>hourly</button>
    ) : (
      <button onClick={onToggleDailyHourly}>hourly</button>
    )}
  </div>
);

export default DailyHourlyToggle;
