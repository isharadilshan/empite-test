import React from 'react';
import PropTypes from 'prop-types';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
} from 'react-native';

const KeyboardAvoidingWrapper = ({children}) => {
  return (
    <ImageBackground
      source={require('../../../assets/background/abstract.png')}
      resizeMode="cover"
      style={styles.background}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}>
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    backgroundColor: 'black',
  },
  container: {
    flex: 1,
    padding: 16,
    width: '100%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

KeyboardAvoidingWrapper.propTypes = {
  children: PropTypes.node,
};

export default KeyboardAvoidingWrapper;
