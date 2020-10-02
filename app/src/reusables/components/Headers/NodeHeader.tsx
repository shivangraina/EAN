import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import MyText from '../Texts/MyText';
import { dimensionStyles } from '../../styles/style';
import { StyView } from '../../types/common_types';
import { OFFWHITE, TEXT_BLACK } from '../../styles/colors';

interface Props {
  title: string;
  color?: string;

  containerStyle?: StyView;
  headingStyle?: StyView;

  leftNav?: () => void;
  leftNode: () => JSX.Element;
  rightNav?: () => void;
  rightNode: () => JSX.Element;
}

const Header: React.FC<Props> = ({
  title,
  color,

  containerStyle,
  headingStyle,

  leftNav,
  leftNode,
  rightNav,
  rightNode,
}) => (
  <View
    style={[
      styles.container,
      containerStyle,
      { backgroundColor: color },
      dimensionStyles.dw,
    ]}
  >
    <TouchableOpacity onPress={leftNav}>{leftNode}</TouchableOpacity>
    <MyText style={[styles.heading, headingStyle]}>{title}</MyText>
    <TouchableOpacity onPress={rightNav}>{rightNode}</TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: OFFWHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    alignItems: 'center',
  },

  heading: {
    color: TEXT_BLACK,
    fontSize: 20,
  },
});

export default Header;
