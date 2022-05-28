import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Text} from 'react-native';
import {TextInput as Input, useTheme} from 'react-native-paper';

const TextInput = ({errorText, ...props}) => {
  const {colors} = useTheme();

  return (
    <View style={styles.container}>
      <Input
        style={{backgroundColor: colors.backgroundDark}}
        theme={{
          colors: {
            primary: colors.green,
            placeholder: colors.grey,
            text: colors.green,
          },
        }}
        {...props}
      />
      {errorText ? (
        <Text style={[styles.error, {color: colors.red}]}>{errorText}</Text>
      ) : null}
    </View>
  );
};

TextInput.propTypes = {
  errorText: PropTypes.string,
  props: PropTypes.object,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  error: {
    fontSize: 14,
    paddingHorizontal: 4,
    paddingTop: 4,
  },
});

export default memo(TextInput);
