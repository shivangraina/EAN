import React from 'react';
import { StyleSheet } from 'react-native';
import { SUCCESS_TEXT } from '../../styles/colors';
import MyText from '../Texts/MyText';

const ErrorBelow = ({ showError, err }) => (
  <>
    {showError ? (
      <MyText style={[styles.alert, { color: err.err ? 'red' : SUCCESS_TEXT }]}>
        {err.value}
      </MyText>
    ) : null}
  </>
);

const styles = StyleSheet.create({
  alert: {
    fontSize: 9.7,
    position: 'absolute',
    bottom: -13,
    paddingLeft: 1,
  },
});

export default ErrorBelow;
