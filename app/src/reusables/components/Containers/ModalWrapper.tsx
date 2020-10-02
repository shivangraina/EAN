import React from 'react';
import { StyleSheet, View, Modal, StyleProp, ViewStyle } from 'react-native';

interface Props {
  visible: boolean;
  setVisible: (flag: boolean | null) => void;
  contStyle?: StyleProp<ViewStyle>;
}

const ModalWrapper: React.FC<Props> = ({
  children,
  visible,
  setVisible,
  contStyle,
}) => {
  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType="slide"
      transparent={true}
    >
      <View style={[styles.container, contStyle]}>{children}</View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000070',
  },
});

export default ModalWrapper;
