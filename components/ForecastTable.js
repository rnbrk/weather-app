/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/no-array-index-key */
/* eslint-disable react/prop-types */
import React from 'react';
import ForecastColumn from './ForecastColumn';

const ForecastTable = props => (
  <div className="forecast-table__table">
    {props.tableData
      ? props.tableData
          .slice(0, props.amountOfColumns)
          .map((item, index) => (
            <ForecastColumn
              {...item}
              key={index}
              keyId={index}
              type={props.type}
              updateSkycon={props.updateSkycon}
            />
          ))
      : '...'}
  </div>
);

export default ForecastTable;
