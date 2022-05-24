const axios = require('axios');

// this will be moved to config in future
const url = 'https://openweathermap.org';

export const Axios = axios.create({baseURL: url});

/**
  request interceptor
 */
Axios.interceptors.request.use(config => {
  return config;
});
