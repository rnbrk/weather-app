import React from 'react';

import DailyHourlyToggle from './DailyHourlyToggle';
import Footer from './Footer';
import ForecastLineChart from './ForecastLineChart';
import ForecastTable from './ForecastTable';
import Skycons from '../skycons/skycons';
import WeatherToday from './WeatherToday';
import {
  generateWeatherApiUrl,
  generateAddressApiUrl,
  getCityNameFromApi,
  getUserLocation,
  getWeatherDataFromApi,
  cleanUpApiResponse
} from '../utils/ApiFunctions';

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

  skycons = new Skycons({ color: '#ffe200' });

  toggleDailyHourly = () => {
    let newState;
    switch (this.state.dailyOrHourlyForecast) {
      case 'daily':
        newState = 'hourly';
        break;
      case 'hourly':
        newState = 'daily';
        break;
    }

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
    const userLocationResponse = await getUserLocation();

    let userLocation = {
      latitude: userLocationResponse.coords.latitude,
      longitude: userLocationResponse.coords.longitude,
      cityName: undefined
    };

    const addressApiUrl = generateAddressApiUrl(userLocation);
    userLocation.cityName = await getCityNameFromApi(addressApiUrl);

    const weatherApiUrl = generateWeatherApiUrl(userLocation);
    const weatherData = await getWeatherDataFromApi(weatherApiUrl);
    console.log(weatherData);
    const finalWeatherData = cleanUpApiResponse(weatherData);

    this.setState(() => ({
      ...finalWeatherData,
      userLocation,
      weatherDataIsUpdated: true
    }));
  }

  render() {
    return (
      <div className="wrapper">
        <div className="app-container">
          <WeatherToday
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
              dailyOrHourlyForecast={this.state.dailyOrHourlyForecast}
              amountOfColumns={5}
              updateSkycon={this.updateSkycon}
              dailyOrHourlyWeatherData={
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
