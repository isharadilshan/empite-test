import React, {useCallback, useEffect, useState} from 'react';
import {FlatList, View} from 'react-native';
import WeatherCard from '../../../../components/organisms/WeatherCard';
import {getWeather16Days} from '../../../../services/weather';

const WeatherTab = ({currenCordinates}) => {
  const [weatherList, setWeatherList] = useState([]);

  const fetchWeatherDetails = useCallback(async () => {
    try {
      const response = await getWeather16Days(
        currenCordinates?.latitude,
        currenCordinates?.latitude,
      );
      setWeatherList(response?.data.daily);
    } catch (error) {
      console.log(error);
    }
  }, [currenCordinates]);

  useEffect(() => {
    fetchWeatherDetails();
  }, [fetchWeatherDetails]);

  const renderItem = ({item}) => <WeatherCard detail={item} />;

  return (
    <View>
      <FlatList
        data={weatherList}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default WeatherTab;
