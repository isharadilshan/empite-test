import React, {useCallback, useEffect} from 'react';
import {View, Text} from 'react-native';
import {consumeApi} from '../../services/weather';

const HomeScreen = () => {
  const consumeWeatherApi = useCallback(async () => {
    try {
      const response = await consumeApi();
      console.log('response -------------------------------', response);
    } catch (error) {
      console.log('ERROR -------------------------------', error);
    }
  }, []);

  useEffect(() => {
    consumeWeatherApi();
  }, [consumeWeatherApi]);

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>this is home screen</Text>
    </View>
  );
};

export default HomeScreen;
