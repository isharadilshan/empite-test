import {CONSUME_API, GET_WEATHER_16_DAYS} from '../endpoints';
import {RestClient} from '../rest-client';

export const consumeApi = () => {
  return RestClient.get(
    'https://api.openweathermap.org/data/3.0/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid=102bd59b9b806bafe99875038ef48f64',
  );
};

export const getWeather16Days = (lat, lon, days = '16') => {
  return RestClient.get(GET_WEATHER_16_DAYS(lat, lon, days));
};
