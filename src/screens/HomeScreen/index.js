import React, {useCallback, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {Button, View, Text} from 'react-native';
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

  const login = (email, password) => {
    try {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          console.log('RES_-------------------------------', res);
          console.log(res.user.email);
        });
    } catch (error) {
      console.log(error.toString(error));
    }
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>this is home screen</Text>
      <Button
        title="Facebook Sign-In"
        onPress={() => login('ishara@gmail.com', 'PHpid_75')}
      />
    </View>
  );
};

export default HomeScreen;
