import React from 'react';
import moment from 'moment';

import DailyHourlyToggle from './DailyHourlyToggle';
import Footer from './Footer';
import ForecastTable from './ForecastTable';
import WeatherToday from './WeatherToday';

import ForecastLineChart from './ForecastLineChart';
import {
  getUserLocation,
  generateWeatherApiUrl,
  generateAddressApiUrl,
  cleanUpApiResponse
} from '../functions/utils';
import Skycons from '../skycons/skycons';

export default class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      weatherDataIsUpdated: false,
      dailyOrHourlyForecast: 'daily',
      userLocation: {
        longitude: undefined,
        latitude: undefined,
        cityName: ''
      },
      currently: {
        summary: '',
        icon: '',
        temperature: undefined,
        maxTemp: undefined,
        minTemp: undefined,
        cityName: '',
        time: undefined
      },
      dailyForecast: undefined,
      hourlyForecast: undefined,
      hourlyTemperaturesChartData: this.defaultChartData,
      dailyTemperaturesChartData: this.defaultChartData
    };
    this.refreshData = this.refreshData.bind(this);
  }

  defaultChartData = {
    data: {
      labels: [0],
      datasets: [
        {
          label: 'x',
          backgroundColor: 'rgba(0, 0, 0, 0)',
          pointBackgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderColor: 'rgba(255, 255, 255, 0.5)',
          lineTension: 0,
          fill: false,
          data: [0]
        }
      ]
    }
  };

  skycons = new Skycons({ color: '#ffe200' });

  toggleDailyHourly = () => {
    let newState;

    if (this.state.dailyOrHourlyForecast === 'daily') {
      newState = 'hourly';
    } else if (this.state.dailyOrHourlyForecast === 'hourly') {
      newState = 'daily';
    }

    console.log(this.state.dailyOrHourlyForecast);
    this.setState(() => ({
      dailyOrHourlyForecast: newState
    }));
  };

  updateSkycon = (skyconId, skyconTypeString) => {
    const skyconElement = document.getElementById(skyconId);

    if (!skyconElement) {
      this.skycons.add(skyconElement, skyconTypeString);
    } else if (skyconElement.getAttribute('type') !== skyconTypeString) {
      this.skycons.set(skyconElement, skyconTypeString);
      skyconElement.setAttribute('type', skyconTypeString);
    }
  };

  async componentDidMount() {
    this.refreshData();
    this.skycons.play();
  }

  async refreshData() {
    let weatherApiUrl;
    let addressApiUrl;
    let geoLocationResponse;
    let userLocation;
    try {
      geoLocationResponse = await getUserLocation();

      userLocation = {
        latitude: geoLocationResponse.coords.latitude,
        longitude: geoLocationResponse.coords.longitude
      };

      weatherApiUrl = generateWeatherApiUrl(userLocation);
      addressApiUrl = generateAddressApiUrl(userLocation);
    } catch (error) {
      console.error('Error:', error);
    }

    let addressApiResponse;
    try {
      addressApiResponse = await fetch(addressApiUrl);
      if (!addressApiResponse.ok) {
        throw new Error(addressApiResponse.statusText);
      }
    } catch (error) {
      console.error('addressApiResponse', error);
    }
    const addressApiResponseJSON = await addressApiResponse.json();
    if (addressApiResponseJSON.error) {
      console.error('addressApiResponseJSON', addressApiResponseJSON.error);
    } else {
      userLocation.cityName = addressApiResponseJSON.address.town;
    }

    let weatherApiResponse;
    try {
      weatherApiResponse = await fetch(weatherApiUrl);
      if (!weatherApiResponse.ok) {
        throw Error(weatherApiResponse.statusText);
      }
    } catch (error) {
      console.error('weatherApiResponse', error);
    }

    const weatherApiResponseJson = await weatherApiResponse.json();
    const cleanedUpJson = cleanUpApiResponse(weatherApiResponseJson);
    this.setState(() => ({
      ...cleanedUpJson,
      userLocation,
      weatherDataIsUpdated: true
    }));
  }

  render() {
    return (
      <div className="wrapper">
        <div className="app-container">
          <WeatherToday
            // eslint-disable-next-line react/destructuring-assignment
            {...this.state.currently}
            cityName={this.state.userLocation.cityName}
            updateSkycon={this.updateSkycon}
          />

          <div className="weather-forecast">
            <DailyHourlyToggle
              onToggleDailyHourly={this.toggleDailyHourly}
              dailyOrHourlyForecast={this.state.dailyOrHourlyForecast}
            />
            <ForecastTable
              type={this.state.dailyOrHourlyForecast}
              amountOfColumns={5}
              updateSkycon={this.updateSkycon}
              tableData={
                this.state.dailyOrHourlyForecast === 'daily'
                  ? this.state.dailyForecast
                  : this.state.hourlyForecast
              }
            />

            <ForecastLineChart
              chartData={
                this.state.dailyOrHourlyForecast === 'daily'
                  ? this.state.dailyTemperaturesChartData
                  : this.state.hourlyTemperaturesChartData
              }
            />
          </div>
        </div>
        <Footer onClickRefresh={this.refreshData} timeOfLastUpdate={this.state.currently.time} />
      </div>
    );
  }
}
