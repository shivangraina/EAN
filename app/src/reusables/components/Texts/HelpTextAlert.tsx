import React from 'react';
import { StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { TEXT_BLACK } from '../../styles/colors';
import MyText from './MyText';

const getAlert = (title, text, onPressOk, onPressCancel) => {
  Alert.alert(title, text, [
    {
      text: 'Cancel',
      onPress: onPressOk,
      style: 'cancel',
    },
    {
      text: 'OK',
      onPress: onPressCancel,
    },
  ]);
};

const HelpTextAlert = ({
  title,
  size,
  color,
  text,
  onPressOk,
  onPressCancel,

  contStyle,
  textStyle,
  iconContStyle,
  textConfig,
}) => (
  <View style={[styles.container, contStyle]}>
    <MyText {...textConfig} style={[styles.title, textStyle]}>
      {title}
    </MyText>
    <TouchableOpacity
      style={[styles.iconCont, iconContStyle]}
      onPress={() => getAlert(title, text, onPressOk, onPressCancel)}
    >
      <MaterialIcons name="help" size={size} color={color} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  title: {
    color: TEXT_BLACK,
    marginRight: 4,
  },

  iconCont: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HelpTextAlert;
