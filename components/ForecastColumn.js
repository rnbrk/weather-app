/* eslint-disable react/prop-types */
import React from 'react';
import moment from 'moment';

const ForecastColumn = ({ type, dateTime, icon, precipIntensity, precipProbability }) => (
  <div className="forecast-table__column">
    <h4>{type === 'daily' ? dateTime.format('hh:mm') : dateTime.format('ddd')}</h4>
    <p>[{icon || '..'}]</p>
    <p>
      {typeof precipProbability === 'number' ? Math.round(precipProbability) : '..'}%
      {typeof precipIntensity === 'number' ? Math.round(precipIntensity) : '..'}
      mm
    </p>
  </div>
);

export default ForecastColumn;
