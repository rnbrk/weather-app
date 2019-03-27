import moment from 'moment';
import key from '../keys/key';

const getUserLocation = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });

const generateWeatherApiUrl = ({ latitude, longitude }) => {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  return `${proxy}https://api.darksky.net/forecast/${key}/${latitude},${longitude}?exclude=[flags]&units=si`;
};

const generateAddressApiUrl = ({ latitude, longitude }) => {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  return `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
};

const cleanUpApiResponse = json => {
  const currently = {
    ...json.currently,
    maxTemp: json.daily.data[0].temperatureHigh,
    minTemp: json.daily.data[0].temperatureLow
  };

  const addChartDataToTemperatures = arrayOftemperatureArrays => {
    const chartData = {
      labels: Array.isArray(arrayOftemperatureArrays[0])
        ? arrayOftemperatureArrays[0]
        : arrayOftemperatureArrays,
      datasets: []
    };

    const datasetData = {
      label: '',
      backgroundColor: 'rgba(0, 0, 0, 0)',
      pointBackgroundColor: 'rgba(255, 255, 255, 1)',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 2,
      lineTension: 0,
      fill: false,
      data: []
    };
    if (Array.isArray(arrayOftemperatureArrays[0])) {
      arrayOftemperatureArrays.forEach((arr, index) => {
        chartData.datasets.push({
          ...datasetData,
          data: arr,
          label: index
        });
      });
    } else {
      chartData.datasets.push({
        ...datasetData,
        data: arrayOftemperatureArrays,
        label: 0
      });
    }

    return chartData;
  };

  const dailyForecast = json.daily.data.map(
    ({
      time,
      summary,
      icon,
      precipIntensity,
      precipProbability,
      temperatureHigh,
      temperatureLow
    }) => ({
      dateTime: moment.unix(time),
      summary,
      icon,
      precipIntensity,
      precipProbability,
      temperatureHigh,
      temperatureLow
    })
  );

  const dailyTemperaturesHigh = json.daily.data
    .map(({ temperatureHigh }) => Math.floor(temperatureHigh))
    .slice(0, 5);
  const dailyTemperaturesLow = json.daily.data
    .map(({ temperatureLow }) => Math.floor(temperatureLow))
    .slice(0, 5);

  const arrayOfTemperatureArrays = [dailyTemperaturesHigh, dailyTemperaturesLow];
  const dailyTemperaturesChartData = addChartDataToTemperatures(arrayOfTemperatureArrays);

  const hourlyForecast = json.hourly.data.map(
    ({ time, summary, icon, precipIntensity, precipProbability, temperature }) => ({
      dateTime: moment.unix(time),
      summary,
      icon,
      precipIntensity,
      precipProbability,
      temperature
    })
  );

  const hourlyTemperatures = json.hourly.data
    .map(({ temperature }) => Math.floor(temperature))
    .slice(0, 5);
  const hourlyTemperaturesChartData = addChartDataToTemperatures(hourlyTemperatures);

  return {
    currently,
    dailyForecast,
    hourlyForecast,
    hourlyTemperaturesChartData,
    dailyTemperaturesChartData
  };
};

const arraysHaveTheSameValues = (arr1, arr2) => {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
};

export {
  getUserLocation,
  generateWeatherApiUrl,
  generateAddressApiUrl,
  cleanUpApiResponse,
  arraysHaveTheSameValues
};
