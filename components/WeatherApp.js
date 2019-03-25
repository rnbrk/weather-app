import React from 'react';
import moment from 'moment';

import DailyHourlyToggle from './DailyHourlyToggle';
import Footer from './Footer';
import ForecastTable from './ForecastTable';
import WeatherToday from './WeatherToday';

import ForecastLineChart from './ForecastLineChart';
import { getUserLocation, generateWeatherApiUrl, cleanUpApiResponse } from '../functions/utils';
import Skycons from '../skycons/skycons';

export default class WeatherApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dailyOrHourlyForecast: 'daily',
      currently: {
        summary: '',
        icon: '',
        temperature: undefined,
        maxTemp: undefined,
        minTemp: undefined,
        cityName: 'Amsterdam',
        dateTime: moment().format('ddd DD MMMM hh:mm')
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

  skycons = new Skycons({ color: 'white' });

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
    if (document.getElementById(skyconId)) {
      this.skycons.set(document.getElementById(skyconId), skyconTypeString);
    } else {
      this.skycons.add(document.getElementById(skyconId), skyconTypeString);
    }
  };

  async componentDidMount() {
    this.refreshData();
  }

  componentDidUpdate() {}

  async refreshData() {
    let url;
    try {
      const { coords } = await getUserLocation();
      url = generateWeatherApiUrl({
        latitude: coords.latitude,
        longitude: coords.longitude
      });
    } catch (error) {
      console.error('Error:', error);
    }

    let response;
    try {
      response = await fetch(url);
      if (!response.ok) {
        throw Error(response.statusText);
      }
    } catch (error) {
      console.error('Error:', error);
    }

    const json = await response.json();
    const cleanedJson = cleanUpApiResponse(json);
    this.setState(() => ({ ...cleanedJson }));
  }

  render() {
    return (
      <div className="app-container">
        <WeatherToday
          // eslint-disable-next-line react/destructuring-assignment
          {...this.state.currently}
          updateSkycon={this.updateSkycon}
        />

        <DailyHourlyToggle
          onToggleDailyHourly={this.toggleDailyHourly}
          dailyOrHourlyForecast={this.state.dailyOrHourlyForecast}
        />
        <div>
          <ForecastTable
            type={this.state.dailyOrHourlyForecast}
            amountOfColumns={5}
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
        <Footer onClickRefresh={this.refreshData} />
      </div>
    );
  }
}
