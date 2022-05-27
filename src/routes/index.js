import React, {useEffect, useState} from 'react';
import auth from '@react-native-firebase/auth';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import {LOGIN, HOME} from './route-paths';

const Stack = createStackNavigator();

const Routes = () => {
  const [initializing, setInitializing] = useState(true);
  const [authUser, setAuthUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setAuthUser(user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name={HOME} component={HomeScreen} />
        <Stack.Screen
          name={LOGIN}
          options={{header: () => null}}
          component={LoginScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
