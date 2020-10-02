import React from 'react';
import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';
import MyText from './MyText';
import { WHITE } from '@plootus/common';
import { BORDER_2, BORDER_1 } from '@plootus/common/styles/colors';

interface Props {
  contStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  size?: number;
  text?: string;
}

const CenterLineText: React.FC<Props> = ({
  contStyle,
  textStyle,
  size,
  text,
}) => {
  return (
    <View style={[styles.container, contStyle]}>
      <MyText
        style={[
          styles.text,
          textStyle,
          { fontSize: size },
          size ? { bottom: -(size / 2) } : null,
        ]}
      >
        {text}
      </MyText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    borderTopWidth: 1,
    borderColor: BORDER_1,
  },

  text: {
    color: BORDER_2,
    paddingLeft: 6,
    paddingRight: 6,
    position: 'absolute',
    alignSelf: 'center',
    backgroundColor: WHITE,
  },
});

export default CenterLineText;
