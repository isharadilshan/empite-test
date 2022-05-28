import React, {useCallback, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import {IconButton, useTheme} from 'react-native-paper';
import {getNearByRestaurents} from '../../../../services/map';

const GoogleMapTab = ({currenCordinates}) => {
  const {colors} = useTheme();
  const [restaurentList, setRestaurentList] = useState([]);

  const fetchNearByRestaurents = useCallback(async () => {
    try {
      const response = await getNearByRestaurents(
        currenCordinates?.latitude,
        currenCordinates?.long,
      );
      setRestaurentList(response?.data || []);
    } catch (error) {
      console.log(error);
    }
  }, [currenCordinates]);

  useEffect(() => {
    fetchNearByRestaurents();
  }, [fetchNearByRestaurents]);

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 6.9271,
          longitude: 79.8612,
          latitudeDelta: 0.1122,
          longitudeDelta: 0.0621,
        }}
        showsUserLocation={true}>
        <Marker coordinate={{latitude: 6.9271, longitude: 79.8612}}>
          <IconButton color={colors.red} size={50} icon={'map-marker'} />
        </Marker>
        <Marker coordinate={{latitude: 6.9, longitude: 79.8612}}>
          <IconButton color={colors.red} size={50} icon={'map-marker'} />
        </Marker>
        {restaurentList.length > 0 &&
          restaurentList.map(restarent => {
            return (
              <Marker
                coordinate={{
                  latitude: restarent?.latitude,
                  longitude: restarent?.longitude,
                }}>
                <IconButton color={colors.red} size={50} icon={'map-marker'} />
              </Marker>
            );
          })}
      </MapView>
    </View>
  );
};

GoogleMapTab.propTypes = {
  currenCordinates: PropTypes.object,
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
