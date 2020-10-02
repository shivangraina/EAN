import React from 'react';
import { StyleSheet, ActivityIndicator } from 'react-native';
import { BLUE_BUTTON } from '../../reusables/styles/colors';

interface Props {
  size?: number | 'large' | 'small';
}

const Loading: React.FC<Props> = ({ size = 'large' }) => {
  return (
    <ActivityIndicator
      color={BLUE_BUTTON}
      size={size}
      style={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
  },
});

export default Loading;
