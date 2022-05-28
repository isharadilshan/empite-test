import React, {memo} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {Button as PaperButton} from 'react-native-paper';

const Button = ({mode, style, children, ...props}) => (
  <PaperButton
    style={[styles.button, style]}
    labelStyle={styles.text}
    mode={mode}
    {...props}>
    {children}
  </PaperButton>
);

Button.propTypes = {
  mode: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.node,
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 15,
    lineHeight: 26,
  },
});

export default memo(Button);
