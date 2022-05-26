import React, {useCallback, useEffect} from 'react';
import {View, Text} from 'react-native';
import {getWeather16Days} from '../../../../services/weather';

const WeatherTab = () => {
  const fetchWeatherDetails = useCallback(async () => {
    try {
      const response = await getWeather16Days();
      console.log('Response ------------------------------------', response);
    } catch (error) {
      console.log('ERROR -----------------------------', error);
    }
  }, []);

  useEffect(() => {
    fetchWeatherDetails();
  }, [fetchWeatherDetails]);
  return (
    <View>
      <Text>this is my weather tab</Text>
    </View>
  );
};

export default WeatherTab;
