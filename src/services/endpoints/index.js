export const CONSUME_API = '/api';

export const GET_WEATHER_16_DAYS = (lat, lon, days) =>
  `/onecall?lat=${lat}&lon=${lon}&cnt=${days}&appid=f34e0bd4e3f94975277166607b0e8a9e&units=metric`;

export const GET_NEARBY_RESTAURENTS =
  'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=-33.8670522,151.1957362&radius=100&type=restaurant&key=AIzaSyBAefhRlXEH3vCko-zZTX6PHllTR6av4WI';
