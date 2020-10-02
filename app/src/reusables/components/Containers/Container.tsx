import React from 'react';
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native';
import { dimensionStyles } from '../../styles/style';

interface Props {
  contStyle?: StyleProp<ViewStyle>;
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justify?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  w100?: boolean;
  flexed?: boolean;
}

const Container: React.FC<Props> = ({
  children,
  contStyle,
  align,
  justify,
  w100,
  flexed,
}) => (
  <View
    style={[
      styles.container,
      contStyle,
      align && { alignItems: align },
      justify && { justifyContent: justify },
      w100 && dimensionStyles.w_100,
      flexed && { flex: 1 },
    ]}
  >
    {children}
  </View>
);

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
});

export default Container;
