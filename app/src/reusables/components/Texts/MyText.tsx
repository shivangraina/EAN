import React from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';

const MyText: React.FC<TextProps> = ({ children, style, onPress }) => {
  return (
    <Text onPress={onPress} style={[styles.container, style]}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  container: {
    fontFamily: 'acuminpro',
    letterSpacing: 0,
  },
});

export default MyText;
