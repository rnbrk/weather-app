import moment from 'moment';
import key from '../keys/key';

const addChartDataToTemperatures = arrayOftemperatureArrays => {
  // Turns an array of temperatures or an array of arrays of temperatures
  // into an object which ChartJS can understand

  // Make sure parameter is an array of arrays
  let arrOfArr = [];
  if (!Array.isArray(arrayOftemperatureArrays[0])) {
    arrOfArr.push(arrayOftemperatureArrays);
  } else {
    arrOfArr = [...arrayOftemperatureArrays];
  }

  // x4 Add datasetData per dataArray
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

  const chartData = {
    labels: Array(arrOfArr[0].length).fill(0),
    datasets: []
  };

  arrOfArr.forEach((arr, index) => {
    chartData.datasets.push({
      ...datasetData,
      data: arr,
      label: index
    });
  });

  return chartData;
};

const getArrayOfOneProperty = (arrayOfObjects, propertyName) =>
  arrayOfObjects.map(obj => obj[propertyName]);

const cleanUpApiResponse = json => {
  // 1. Copy currently object
  // 2. Add minTemp and maxTemp to currently object so WeatherToday can easily access it
  const currently = {
    ...json.currently,
    maxTemp: json.daily.data[0].temperatureHigh,
    minTemp: json.daily.data[0].temperatureLow
  };

  // Takes the relevant data from the API response
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

  // Gets the daily temperature data from the API response
  // And saves it as an array
  const dailyTemperaturesHigh = getArrayOfOneProperty(json.daily.data, 'temperatureHigh').slice(
    0,
    5
  );
  const dailyTemperaturesLow = getArrayOfOneProperty(json.daily.data, 'temperatureLow').slice(0, 5);

  // Turns two arrays of daily temperatures into chart data which ChartJS can understand
  const arrayOfTemperatureArrays = [dailyTemperaturesHigh, dailyTemperaturesLow];
  const dailyTemperaturesChartData = addChartDataToTemperatures(arrayOfTemperatureArrays);

  // Takes the relevant data from the API response
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

  // Turns an arrays of hourly temperatures into chart data which ChartJS can understand
  const hourlyTemperatures = getArrayOfOneProperty(json.hourly.data, 'temperature').slice(0, 5);
  const hourlyTemperaturesChartData = addChartDataToTemperatures(hourlyTemperatures);

  // Combines everything into a state object which WeatherApp can understand
  return {
    currently,
    dailyForecast,
    hourlyForecast,
    hourlyTemperaturesChartData,
    dailyTemperaturesChartData
  };
};

const generateAddressApiUrl = ({ latitude, longitude }) => {
  return `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
};

const generateWeatherApiUrl = ({ latitude, longitude }) => {
  const proxy = 'https://cors-anywhere.herokuapp.com/';
  return `${proxy}https://api.darksky.net/forecast/${key}/${latitude},${longitude}?exclude=[flags]&units=si`;
};

async function getCityNameFromApi(addressApiUrl) {
  let addressApiResponse;
  try {
    addressApiResponse = await fetch(addressApiUrl);
    if (!addressApiResponse.ok) {
      throw new Error(addressApiResponse.statusText);
    }
  } catch (error) {
    console.error('Error: could not get city name.', error);
  }

  // Get the address data from the API response
  const addressData = await addressApiResponse.json();
  if (addressData.error) {
    console.error('Error: did not get valid address data.', addressData.error);
  } else {
    return addressData.address.town;
  }
}

const getUserLocation = () =>
  new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  }).catch(error => {
    console.error('Error: could not get userLocation.', error);
  });

async function getWeatherDataFromApi(weatherApiUrl) {
  let weatherApiResponse;
  try {
    weatherApiResponse = await fetch(weatherApiUrl);

    if (!weatherApiResponse.ok) {
      throw Error(weatherApiResponse.statusText);
    }
  } catch (error) {
    console.error('Error: could not get weather data.', error);
  }
  const weatherData = await weatherApiResponse.json();
  return weatherData;
}

export {
  cleanUpApiResponse,
  generateAddressApiUrl,
  generateWeatherApiUrl,
  getCityNameFromApi,
  getWeatherDataFromApi,
  getUserLocation
};
