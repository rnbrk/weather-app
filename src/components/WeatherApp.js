import React from 'react';

import DailyHourlyToggle from './DailyHourlyToggle';
import Footer from './Footer';
import ForecastLineChart from './ForecastLineChart';
import ForecastTable from './ForecastTable';
import Skycons from '../skycons/skycons';
import ErrorMessage from './ErrorMessage';
import WeatherToday from './WeatherToday';
import {
  generateWeatherApiUrl,
  generateAddressApiUrl,
  getCityNameFromApi,
  getUserLocation,
  getWeatherDataFromApi,
  reformatWeatherDataFromApiToState
} from '../utils/ApiFunctions';

const errorMessages = {
  LOADING: 'Connecting...',
  PERMISSION_DENIED: 'Turn on location on your device.',
  NO_POSITION: 'Did not get location data, refresh to try again.'
};

export default class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amountOfForecastColumns: 7,
      dailyOrHourlyForecast: 'daily',
      errorMessage: errorMessages.LOADING,
      weatherDataIsUpdated: false,
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
      hourlyTemperaturesChartData: undefined,
      dailyTemperaturesChartData: undefined
    };
    this.updateAllAppData = this.updateAllAppData.bind(this);
  }

  skycons = new Skycons({ color: '#ffe200' });

  async componentDidMount() {
    this.updateAllAppData();
    window.addEventListener('resize', this.onResizeScreen);
    this.onResizeScreen();
    this.skycons.play();
  }

  resizeForecastContainerTo = amountOfForecastColumns => {
    // Adjust padding to align width of the forecast chart with the corecast columns
    if (!this.state.errorMessage) {
      const newPadding = `calc(${100 / amountOfForecastColumns}%) - 7px`;
      const lineChart = document.querySelector('.forecast-table__line-chart');
      lineChart.style.paddingLeft = newPadding;
      lineChart.style.paddingRight = newPadding;
    }

    // Set amount of columns
    this.setState(() => ({
      amountOfForecastColumns
    }));
  };

  onResizeScreen = () => {
    let amountOfForecastColumns;
    if (window.innerWidth < 550) {
      amountOfForecastColumns = 5;
    } else if (window.innerWidth < 640) {
      amountOfForecastColumns = 6;
    } else {
      amountOfForecastColumns = 7;
    }

    if (amountOfForecastColumns !== this.state.amountOfForecastColumns) {
      this.resizeForecastContainerTo(amountOfForecastColumns);
    }
  };

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

  async updateAllAppData() {
    const userLocation = await getUserLocation();

    if (userLocation.error === 'PERMISSION_DENIED') {
      this.setState(() => ({
        errorMessage: errorMessages.PERMISSION_DENIED
      }));
    }

    if (userLocation.error) {
      return;
    }

    const addressApiUrl = generateAddressApiUrl(userLocation);
    userLocation.cityName = await getCityNameFromApi(addressApiUrl);

    const weatherApiUrl = generateWeatherApiUrl(userLocation);
    const weatherData = await getWeatherDataFromApi(weatherApiUrl);
    const finalWeatherData = reformatWeatherDataFromApiToState(weatherData);

    this.setState(() => ({
      ...finalWeatherData,
      userLocation,
      weatherDataIsUpdated: true,
      errorMessage: ''
    }));
  }

  updateSkycon = (skyconId, skyconTypeString) => {
    const skyconElement = document.getElementById(skyconId);

    if (!skyconElement) {
      this.skycons.add(skyconElement, skyconTypeString);
    } else if (skyconElement.getAttribute('type') !== skyconTypeString) {
      this.skycons.set(skyconElement, skyconTypeString);
      skyconElement.setAttribute('type', skyconTypeString);
    }
  };

  render() {
    return (
      <div className="wrapper">
        {this.state.errorMessage ? (
          <ErrorMessage text={this.state.errorMessage} />
        ) : (
          <div className="app-container">
            <WeatherToday
              {...this.state.currently}
              cityName={this.state.userLocation.cityName}
              updateSkycon={this.updateSkycon}
            />

            <div className="weather-forecast">
              <DailyHourlyToggle
                dailyOrHourlyForecast={this.state.dailyOrHourlyForecast}
                onToggleDailyHourly={this.toggleDailyHourly}
              />

              <ForecastTable
                amountOfForecastColumns={this.state.amountOfForecastColumns}
                dailyOrHourlyForecast={this.state.dailyOrHourlyForecast}
                dailyOrHourlyWeatherData={
                  this.state.dailyOrHourlyForecast === 'daily'
                    ? this.state.dailyForecast
                    : this.state.hourlyForecast
                }
                updateSkycon={this.updateSkycon}
              />

              <ForecastLineChart
                amountOfForecastColumns={this.state.amountOfForecastColumns}
                arrayOfChartdataArrays={
                  this.state.dailyOrHourlyForecast === 'daily'
                    ? this.state.dailyTemperatures
                    : this.state.hourlyTemperatures
                }
              />
            </div>
          </div>
        )}
        <Footer
          onClickRefresh={this.updateAllAppData}
          timeOfLastUpdate={this.state.currently.time}
        />
      </div>
    );
  }
}
