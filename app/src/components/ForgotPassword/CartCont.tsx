import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BLUE_BUTTON, BORDER, WHITE } from '../../reusables/styles/colors';

const CartCont = ({ children, selected }) => {
  return (
    <View
      style={[
        styles.container,
        selected && {
          borderColor: BLUE_BUTTON,
          opacity: 1,
          backgroundColor: WHITE,
        },
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
    // alignSelf: 'center',
    borderWidth: 1,
    borderColor: BORDER,
    padding: 12,
    borderRadius: 8,
    marginBottom: 24,
    opacity: 0.5,
    backgroundColor: '#e1e1e1',
  },
});

export default CartCont;
