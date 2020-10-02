import React from 'react';
import { StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { BLUE_BUTTON, WHITE } from '../../styles/colors';
import { dimensionStyles } from '../../styles/style';
import MyText from '../Texts/MyText';
import { CommonButtonProps } from './types';

interface Props extends CommonButtonProps {
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  handlePress,
  long,
  title,
  contStyle,
  textStyle,
  touchConfig,
  loading,
  disabled,
}) => (
  <TouchableOpacity
    disabled={disabled}
    style={[styles.container, contStyle, long ? dimensionStyles.w_100 : null]}
    onPress={handlePress}
    {...touchConfig}
  >
    {!loading ? (
      <MyText style={[styles.text, textStyle]}>{title}</MyText>
    ) : (
      <ActivityIndicator color={WHITE} />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: BLUE_BUTTON,
    borderRadius: 3.3,
    elevation: 2,

    // shadowColor: BLACK,
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.25,
    // shadowRadius: 3.84,
  },

  text: {
    color: WHITE,
    fontSize: 11.7,
  },
});

export default Button;
