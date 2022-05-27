import React, {useCallback, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import {getNearByRestaurents} from '../../../../services/map';

const GoogleMapTab = () => {
  const fetchNearByRestaurents = useCallback(async () => {
    try {
      const response = await getNearByRestaurents();
      console.log('RESPONSE 22-------------------------------', response);
    } catch (error) {
      console.log('ERRO R-------------------------------', error);
    }
  }, []);

  useEffect(() => {
    fetchNearByRestaurents();
  }, [fetchNearByRestaurents]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

export default GoogleMapTab;
