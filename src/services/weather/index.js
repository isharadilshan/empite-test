import {CONSUME_API, GET_WEATHER_16_DAYS} from '../endpoints';
import {RestClient} from '../rest-client';

export const consumeApi = () => {
  return RestClient.get(CONSUME_API);
};

export const getWeather16Days = (
  lat = '6.203488',
  lon = '81.109853',
  days = '16',
) => {
  return RestClient.get(GET_WEATHER_16_DAYS(lat, lon, days));
};
