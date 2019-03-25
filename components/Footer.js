import React from 'react';

const Footer = props => (
  <div className="footer">
    <a href="https://darksky.net">Powered by DarkSky API</a>
    <button onClick={props.onClickRefresh}>Refresh</button>
  </div>
);

export default Footer;
