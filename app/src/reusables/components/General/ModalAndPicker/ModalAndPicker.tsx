import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BLUE_BUTTON, BLACK, BLACK_1 } from '../../../styles/colors';
import { CommonCompStyles, StyView } from '../../../types/common_types';
import MyText from '../../Texts/MyText';
import PickerCont from '../PickerCont';
import ModalPickerContainer from './ModalPickerContainer';
import { CommonModalProps } from './types';

type CombinedProps = CommonCompStyles & CommonModalProps;

interface Props extends CombinedProps {
  pickerLabel?: string;
  titleSpacing?: boolean;
  pickerLabelStyle?: StyView;
}

const ModalAndPicker: React.FC<Props> = ({
  contStyle,
  textStyle,
  iconStyle,

  title,
  pickerLabel,
  pickerLabelStyle,
  titleSpacing,
  index,
  handlePressOnPicker,
  handlePressModalOption,
  hideModal,
  rows,
  visible,
  err,
  modalContStyle,
}) => (
  <View style={[contStyle, { marginBottom: 19 }]}>
    {/* {pickerLabel ? (
      <MyText style={[styles.title, pickerLabelStyle]}>{pickerLabel}</MyText>
    ) : titleSpacing ? (
      <MyText style={styles.title}>{''}</MyText>
    ) : null} */}
    <PickerCont
      index={index}
      handlePress={handlePressOnPicker}
      text={rows[index].label}
      err={err}
      iconStyle={iconStyle}
      textStyle={index ? textStyle : { color: BLACK_1 }}
    />
    <ModalPickerContainer
      container={modalContStyle}
      title={title}
      pickerIndex={index}
      visible={visible}
      handlePress={(idx) => handlePressModalOption?.(idx)}
      hideModal={hideModal}
      rows={rows}
    />
  </View>
);

const styles = StyleSheet.create({
  title: {
    color: BLUE_BUTTON,
    fontSize: 12,
    marginBottom: 8,
  },
});

export default ModalAndPicker;
