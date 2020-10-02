import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { WHITE } from '../../styles/colors';

const { width } = Dimensions.get('screen');

interface Props {
  contStyle?: StyleProp<ViewStyle>;
}

const CenteredContainer: React.FC<Props> = ({ contStyle, children }) => (
  <View style={[styles.container, contStyle]}>{children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width,
    backgroundColor: WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CenteredContainer;
