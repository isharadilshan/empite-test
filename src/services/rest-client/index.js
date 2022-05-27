const axios = require('axios');

// this will be moved to config in future
const url = 'https://api.openweathermap.org/data/2.5';

export const RestClient = axios.create({baseURL: url});

/**
  request interceptor
 */
RestClient.interceptors.request.use(config => {
  return config;
});
