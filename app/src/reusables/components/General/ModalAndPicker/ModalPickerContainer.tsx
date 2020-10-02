import { Entypo } from '@expo/vector-icons';
import React from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  BLUE_BUTTON,
  BORDER,
  TEXT_BLACK_1,
  WHITE,
} from '../../../styles/colors';
import { dimensionStyles, marginStyles } from '../../../styles/style';
import { CommonCompStyles } from '../../../types/common_types';

const dimensions = Dimensions.get('screen');

type CombinedProps = CommonCompStyles;

interface Props extends CombinedProps {
  pickerIndex: number;
  title: string;
  rows: { value: string, label: string }[];
  visible: boolean;
  hideModal: () => void;
  handlePress: (index: number) => void;

  height?: number;
  container?: any;
  exitCross?: any;
}

const ModalPickerContainer: React.FC<Props> = ({
  pickerIndex,
  handlePress,
  visible,
  hideModal,
  rows,
  height,
  title,
  container,
  exitCross,
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="slide"
    onRequestClose={hideModal}
  >
    <View style={styles.outerCont}>
      <View style={[styles.container, container]}>
        <Entypo
          name="cross"
          size={24}
          color={BLUE_BUTTON}
          onPress={hideModal}
          style={[styles.exitCross, exitCross]}
        />
        <Text style={styles.heading}>{title}</Text>
        <FlatList
          data={rows}
          style={[
            dimensionStyles.w_100,
            marginStyles.m_8,
            height ? { height } : null,
          ]}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={[
                styles.rowCont,
                index === pickerIndex ? { backgroundColor: BLUE_BUTTON } : null,
              ]}
              onPress={() => handlePress?.(index)}
            >
              <Text
                style={[
                  styles.rowText,
                  index === pickerIndex ? { color: WHITE } : null,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  outerCont: {
    justifyContent: 'center',
    alignItems: 'center',
    width: dimensions.width,
    height: dimensions.height,
    backgroundColor: '#00000070',
  },

  container: {
    padding: 8,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: WHITE,
    borderWidth: 1,
    borderColor: BORDER,
    elevation: 15,
    borderRadius: 5,
    position: 'relative',
  },

  exitCross: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
  },

  heading: {
    color: TEXT_BLACK_1,
  },

  scrollCont: {
    width: '100%',
    margin: 8,
    marginBottom: 0,
  },

  rowCont: {
    elevation: 1,
    backgroundColor: WHITE,
    borderBottomWidth: 0.5,
    borderColor: BORDER,
    marginTop: 8,
    width: '100%',
    borderWidth: 1,
    alignItems: 'center',
  },

  rowText: {
    textAlign: 'center',
    color: BLUE_BUTTON,
    margin: 4,
  },
});

export default ModalPickerContainer;
