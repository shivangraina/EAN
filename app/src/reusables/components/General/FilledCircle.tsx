import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { getCircleStyle } from '../../styles/style';
import { StyView } from '../../types/common_types';

interface Props {
  color: string;
  size: number;
  contStyle: StyView;
  config: TouchableOpacityProps;
  disabled?: boolean;
}

const FilledCircle: React.FC<Props> = ({
  color,
  size,
  contStyle,
  config,
  disabled,
}) => (
  <TouchableOpacity
    disabled={disabled}
    style={[
      styles.circle,
      { ...getCircleStyle(size), backgroundColor: color },
      contStyle,
    ]}
    {...config}
  />
);

const styles = StyleSheet.create({
  circle: {
    overflow: 'hidden',
    margin: 4,
  },
});

export default FilledCircle;
