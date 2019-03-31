import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css/normalize.css';
import './styles/styles.scss';
import WeatherApp from './components/WeatherApp';

ReactDOM.render(<WeatherApp />, document.querySelector('#app'));
