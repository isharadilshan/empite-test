import React, {useCallback, useEffect} from 'react';
import auth from '@react-native-firebase/auth';
import {StyleSheet} from 'react-native';
import {Subheading} from 'react-native-paper';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ScreenWrapper from '../../components/wrappers/ScreenWrapper';
import {consumeApi} from '../../services/weather';
import GoogleMapTab from './tabs/GoogleMapTab';
import WeatherTab from './tabs/WeatherTab';

const HomeScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'first', title: 'Weather Details'},
    {key: 'second', title: 'Near by Restaurents'},
  ]);

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

  const renderScene = SceneMap({
    first: WeatherTab,
    second: GoogleMapTab,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={[styles.tabBarIndicator, {backgroundColor: '#6A2C91'}]}
      style={{backgroundColor: '#F3F3F3'}}
      renderLabel={({route, color}) => (
        <Subheading style={[styles.tabBarLabel, {color}]}>
          {route.title}
        </Subheading>
      )}
      pressColor={'#CCCCCC'}
      activeColor={'#6A2C91'}
      inactiveColor={'#333333'}
      scrollEnabled={true}
      tabStyle={{width: 200}}
    />
  );

  return (
    <ScreenWrapper>
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
      />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  tabBarIndicator: {
    height: 4,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
  },
  tabBarLabel: {lineHeight: 20, fontSize: 16},
});

export default HomeScreen;
