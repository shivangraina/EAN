import React from 'react';
import { StyleSheet, View } from 'react-native';
import MyText from './MyText';
import {
  BagError, BagWarning, textError, textWarning, textSuccess, BagSuccess,
} from '../../styles/colors';

const TextAlert = ({
  textStyle,
  containerStyle,

  text,
  type,
}) => {
  let textColor;
  let bagColor;

  switch (type) {
    case 'success':
      textColor = textSuccess;
      bagColor = BagSuccess;
      break;

    case 'error':
      textColor = textError;
      bagColor = BagError;
      break;

    case 'warning':
      textColor = textWarning;
      bagColor = BagWarning;
      break;

    default:
      textColor = textSuccess;
      bagColor = BagSuccess;
      break;
  }
  return (
    <View style={[styles.container, containerStyle, { backgroundColor: bagColor }]}>
      <MyText style={[textStyle, { color: textColor }]}>{text}</MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 4,
    marginBottom: 4,
    padding: 8,
    borderRadius: 4,
  },
});

export default TextAlert;
