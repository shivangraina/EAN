/* eslint-disable import/prefer-default-export */
import { StyleSheet } from 'react-native';

export const containerStyles = StyleSheet.create({
  // fd Column
  bothCenter: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  alignCenter: {
    width: '100%',
    alignItems: 'center',
  },

  jutifyCenter: {
    width: '100%',
    justifyContent: 'center',
  },

  paddedCont: {
    padding: 8,
    alignItems: 'center',
    width: '100%',
  },

  // fd Row
  rowCont: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  centeredRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  spaceAround: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  spaceBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
