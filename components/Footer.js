import React from 'react';
import moment from 'moment';
import { refreshIcon } from '../svgs/icons';

const Footer = props => (
  <div className="footer">
    <span>
      Powered by{' '}
      <a href="https://darksky.net" target="_blank">
        DarkSky
      </a>{' '}
      and{' '}
      <a href="https://nominatim.org/" target="_blank">
        Nominatim
      </a>
    </span>

    <div>
      {props.timeOfLastUpdate ? (
        <span>Updated: {moment.unix(props.timeOfLastUpdate).format('HH:mm')}</span>
      ) : (
        <span>Weather data not updated</span>
      )}

      <a onClick={props.onClickRefresh}>{refreshIcon}</a>
    </div>
  </div>
);

export default Footer;
