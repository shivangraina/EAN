import React from 'react';
import { StyleSheet, View } from 'react-native';
import RowContainer from '../Containers/RowContainer';
import { BORDER } from '../../styles/colors';

const Divider = () => {
  return (
    <RowContainer
      contStyle={{
        borderBottomWidth: 1,
        borderColor: BORDER,
        paddingBottom: 16,
      }}
      justifyContent="flex-start"
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Divider;
