import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { refreshIcon } from '../svgs/icons';

const Footer = ({ onClickRefresh, timeOfLastUpdate }) => (
  <div className="footer">
    <span>
      Powered by{' '}
      <a href="https://darksky.net" target="_blank" rel="noopener noreferrer" tabIndex="0">
        DarkSky
      </a>{' '}
      and{' '}
      <a href="https://nominatim.org/" target="_blank" rel="noopener noreferrer" tabIndex="0">
        Nominatim
      </a>
    </span>

    <div>
      {timeOfLastUpdate ? (
        <span className="footer__updated-text">
          Updated: {moment.unix(timeOfLastUpdate).format('HH:mm')}
        </span>
      ) : (
        <span className="footer__updated-text">Weather data not updated</span>
      )}

      <div
        role="button"
        tabIndex="0"
        className="refresh-button"
        onClick={onClickRefresh}
        onKeyPress={onClickRefresh}
      >
        {refreshIcon}
      </div>
    </div>
  </div>
);

Footer.propTypes = {
  onClickRefresh: PropTypes.func.isRequired,
  // eslint-disable-next-line react/require-default-props
  timeOfLastUpdate: PropTypes.number
};

export default Footer;
