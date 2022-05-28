import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LogoutButton from '../components/atoms/LogoutButton';
import HomeScreen from '../screens/HomeScreen';
import {HOME} from './route-paths';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={HOME}
        component={HomeScreen}
        options={{headerRight: () => <LogoutButton />}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
