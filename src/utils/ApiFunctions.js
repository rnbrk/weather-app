import moment from 'moment';
import key from '../keys/key';

const getOnePropertyFromArrayOfObjects = (propertyName, arrayOfObjects) =>
  arrayOfObjects.map(obj => obj[propertyName]);

const reformatWeatherDataFromApiToState = json => {
  const currently = {
    ...json.currently,
    maxTemp: json.daily.data[0].temperatureHigh,
    minTemp: json.daily.data[0].temperatureLow
  };

  // Create array of objects with relevant data for the daily forecast
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

  // Create array of arrays with high and low daily temperatures for ChartJS
  const dailyTemperaturesHigh = getOnePropertyFromArrayOfObjects(
    'temperatureHigh',
    json.daily.data
  );
  const dailyTemperaturesLow = getOnePropertyFromArrayOfObjects('temperatureLow', json.daily.data);
  const dailyTemperatures = [dailyTemperaturesHigh, dailyTemperaturesLow];

  // Create array of objects with relevant data for the hourly forecast
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

  // Create array with one array inside with hourly temperatures for ChartJS
  const hourlyTemperatures = [];
  hourlyTemperatures.push(getOnePropertyFromArrayOfObjects('temperature', json.hourly.data));

  return {
    currently,
    dailyForecast,
    hourlyForecast,
    hourlyTemperatures,
    dailyTemperatures
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
  })
    .then(response => ({
      latitude: response.coords.latitude,
      longitude: response.coords.longitude,
      cityName: undefined
    }))
    .catch(error => {
      if (error.code === error.PERMISSION_DENIED) {
        return { error: 'PERMISSION_DENIED' };
      }
      return { error: 'NO_POSITION' };
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
  generateAddressApiUrl,
  generateWeatherApiUrl,
  getCityNameFromApi,
  getWeatherDataFromApi,
  getUserLocation,
  reformatWeatherDataFromApiToState
};
