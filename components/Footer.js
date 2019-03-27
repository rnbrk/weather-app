import React from 'react';
import moment from 'moment';

const Footer = props => (
  <div className="footer">
    <div>
      <span>Powered by </span>
      <a href="https://darksky.net" target="_blank">
        DarkSky
      </a>{' '}
      <span> and </span>
      <a href="https://nominatim.org/" target="_blank">
        Nominatim
      </a>
    </div>
    <div>
      {props.timeOfLastUpdate ? (
        <span>Updated: {moment.unix(props.timeOfLastUpdate).format('HH:mm')}</span>
      ) : (
        <span>Not updated</span>
      )}
      <button onClick={props.onClickRefresh}>Refresh</button>
    </div>
  </div>
);

export default Footer;
