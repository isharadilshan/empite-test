import React from 'react';
import PropTypes from 'prop-types';
import {View} from 'react-native';

const ScreenWrapper = ({children, noPaddings}) => {
  return (
    <View
      style={{
        flex: 1,
      }}>
      {children}
    </View>
  );
};

ScreenWrapper.propTypes = {
  children: PropTypes.node,
  noPaddings: PropTypes.bool,
};

export default ScreenWrapper;
