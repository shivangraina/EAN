import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { BLUE_BUTTON, WHITE } from '../../styles/colors';
import { containerStyles } from '../../styles/containers';
import {
  dimensionStyles,
  getSquare,
  marginStyles,
  positionStyles,
} from '../../styles/style';
import MyText from '../Texts/MyText';
import { CommonButtonProps } from './types';

interface Props extends CommonButtonProps {
  size?: number;
  tintColor?: string;
  right?: boolean;
}

const IconTextButton: React.FC<Props> = ({
  handlePress,
  title,
  contStyle,
  textStyle,
  long,

  size,
  tintColor,
  right,

  iconSource,
  iconStyle,
  iconContStyle,
  renderIcon,

  touchConfig,
  textConfig,
}) => (
  <TouchableOpacity
    style={[
      containerStyles.centeredRow,
      styles.container,
      contStyle,
      right ? positionStyles.fdrr : null,
      long ? dimensionStyles.w_100 : null,
    ]}
    onPress={handlePress}
    {...touchConfig}
  >
    <View style={iconContStyle}>
      {iconSource && size ? (
        <Image
          source={iconSource}
          style={[iconStyle, { ...getSquare(), tintColor }]}
          resizeMode="contain"
        />
      ) : renderIcon ? (
        renderIcon()
      ) : null}
    </View>
    <MyText
      {...textConfig}
      style={[styles.text, textStyle, right ? marginStyles.mr_4 : null]}
    >
      {title}
    </MyText>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: BLUE_BUTTON,
    borderRadius: 4,
    padding: 4,
    paddingLeft: 8,
    paddingRight: 8,
    elevation: 2,
  },

  text: {
    color: WHITE,
    marginLeft: 4,
  },
});

export default IconTextButton;
