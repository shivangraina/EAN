import React from 'react';
import {
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { WHITE } from '../../styles/colors';
import { paddingStyles } from '../../styles/style';

const { width } = Dimensions.get('screen');

interface Props {
  contStyle?: StyleProp<ViewStyle>;
  padding?: boolean;
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}

const FlexedContainer: React.FC<Props> = ({
  children,
  contStyle,
  padding,
  align,
  justify,
}) => (
  <View
    style={[
      styles.container,
      padding && paddingStyles.plr_16,
      align && { alignItems: align },
      justify && { justifyContent: justify },
      contStyle,
    ]}
  >
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    width,
    borderWidth: 0,
    backgroundColor: WHITE,
  },
});

export default FlexedContainer;
