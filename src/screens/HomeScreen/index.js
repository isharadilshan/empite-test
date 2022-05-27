import React, {useCallback, useEffect} from 'react';
import {
  Alert,
  Linking,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import {Subheading} from 'react-native-paper';
import {TabView, TabBar} from 'react-native-tab-view';
import ScreenWrapper from '../../components/wrappers/ScreenWrapper';
import GoogleMapTab from './tabs/GoogleMapTab';
import WeatherTab from './tabs/WeatherTab';

const HomeScreen = () => {
  const [index, setIndex] = React.useState(0);
  const [currenCordinates, setCurrentCordinates] = React.useState({});
  const [routes] = React.useState([
    {key: 'first', title: 'Weather Details'},
    {key: 'second', title: 'Near by Restaurents'},
  ]);

  const hasPermissionIOS = async () => {
    const openSetting = () => {
      Linking.openSettings().catch(() => {
        Alert.alert('Unable to open settings');
      });
    };
    const status = await Geolocation.requestAuthorization('whenInUse');

    if (status === 'granted') {
      return true;
    }

    if (status === 'denied') {
      Alert.alert('Location permission denied');
    }

    if (status === 'disabled') {
      Alert.alert(
        'Turn on Location Services to allow EmpiteTest to determine your location.',
        '',
        [
          {text: 'Go to Settings', onPress: openSetting},
          {text: "Don't Use Location", onPress: () => {}},
        ],
      );
    }

    return false;
  };

  const hasLocationPermission = useCallback(async () => {
    if (Platform.OS === 'ios') {
      const hasPermission = await hasPermissionIOS();
      return hasPermission;
    }

    if (Platform.OS === 'android' && Platform.Version < 23) {
      return true;
    }

    const hasPermission = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );

    if (status === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    }

    if (status === PermissionsAndroid.RESULTS.DENIED) {
      ToastAndroid.show(
        'Location permission denied by user.',
        ToastAndroid.LONG,
      );
    } else if (status === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
      ToastAndroid.show(
        'Location permission revoked by user.',
        ToastAndroid.LONG,
      );
    }

    return false;
  }, []);

  const getCurrentLocation = useCallback(async () => {
    const hasPermission = await hasLocationPermission();

    if (!hasPermission) {
      return;
    }

    Geolocation.getCurrentPosition(
      position => {
        setCurrentCordinates(position?.coords);
      },
      error => {
        Alert.alert(`Code ${error.code}`, error.message);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        timeout: 15000,
        maximumAge: 10000,
        distanceFilter: 0,
        forceRequestLocation: true,
        forceLocationManager: true,
        showLocationDialog: true,
      },
    );
  }, [hasLocationPermission]);

  useEffect(() => {
    getCurrentLocation();
  }, [getCurrentLocation]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'first':
        return <WeatherTab currenCordinates={currenCordinates} />;
      case 'second':
        return <GoogleMapTab currenCordinates={currenCordinates} />;
      default:
        return null;
    }
  };

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
