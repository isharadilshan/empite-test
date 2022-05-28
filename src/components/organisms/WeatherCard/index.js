import React from 'react';
import moment from 'moment';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme, IconButton} from 'react-native-paper';

const WeatherCard = ({detail}) => {
  const {colors} = useTheme();
  return (
    <View style={[styles.cardWrapper, {backgroundColor: colors.matBlue}]}>
      <View style={styles.textRowWrapper}>
        <IconButton size={20} icon={'calendar'} color={colors.darkBlueGrey} />
        <Text style={[styles.textName, {color: colors.darkBlueGrey}]}>
          {'Date: '} {moment(detail?.dt).format('llll')}
        </Text>
      </View>
      <View style={styles.textRowWrapper}>
        <IconButton size={20} icon={'cup-water'} color={colors.darkBlueGrey} />
        <Text style={[styles.textName, {color: colors.darkBlueGrey}]}>
          {'Dew point: '} {detail?.dew_point}
        </Text>
      </View>
      <View style={styles.textRowWrapper}>
        <IconButton
          size={20}
          icon={'air-humidifier'}
          color={colors.darkBlueGrey}
        />
        <Text style={[styles.textName, {color: colors.darkBlueGrey}]}>
          {'Humidity: '} {detail?.humidity}
          {'%'}
        </Text>
      </View>
      <View style={styles.textRowWrapper}>
        <IconButton
          size={20}
          icon={'temperature-celsius'}
          color={colors.darkBlueGrey}
        />
        <Text style={[styles.textName, {color: colors.darkBlueGrey}]}>
          {'Temperature: '} {detail?.temp?.day}
          {' C'}
        </Text>
      </View>
      <View style={styles.textRowWrapper}>
        <IconButton
          size={20}
          icon={'weather-cloudy-alert'}
          color={colors.darkBlueGrey}
        />
        <Text style={[styles.textName, {color: colors.darkBlueGrey}]}>
          {'Weather: '} {detail?.weather[0]?.description}
        </Text>
      </View>
      <View style={styles.textRowWrapper}>
        <IconButton
          size={20}
          icon={'car-brake-low-pressure'}
          color={colors.darkBlueGrey}
        />
        <Text style={[styles.textName, {color: colors.darkBlueGrey}]}>
          {'Pressure: '} {detail?.pressure}
          {' hPa'}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    height: 200,
    flex: 1,
    elevation: 5,
  },
  textRowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
  },
  textName: {
    fontSize: 12,
    fontWeight: '700',
  },
});

export default WeatherCard;
