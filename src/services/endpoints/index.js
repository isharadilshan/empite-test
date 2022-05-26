export const CONSUME_API = '/api';

export const GET_WEATHER_16_DAYS = (lat, lon, days) =>
  `/forecast/daily?lat=${lat}&lon=${lon}&cnt=${days}&appid=a4dbc12df79c612efb95e65fb5dfda98`;
