import { Octicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useDidUpdate from '../../hooks/useDidUpdate';
import { BLUE_BUTTON, BORDER, TEXT_BLACK, WHITE } from '../../styles/colors';
import { borderStyles, paddingStyles } from '../../styles/style';
import PickerCont from '../General/PickerCont';

const PICKER_HEIGHT = 40;

const FloatingPicker = ({
  rows,
  index,
  handlePress,
  visible,
  setIndex,

  width,
  contStyle,
  floaterContStyle,
  pickerContStyle,
  iconStyle,
  textStyle,
}) => {
  const [viewHeight, setViewHeight] = useState(null);

  useDidUpdate(() => {
    if (!visible) {
      setViewHeight(PICKER_HEIGHT);
    }
  }, [visible]);

  return (
    <View
      style={[
        styles.container,
        contStyle,
        { width },
        viewHeight && { height: viewHeight },
      ]}
    >
      <PickerCont
        handlePress={handlePress}
        text={rows[index].label}
        contStyle={[paddingStyles.p_4, pickerContStyle]}
        iconStyle={iconStyle}
        textStyle={textStyle}
      />
      {visible && (
        <View
          style={[styles.pickerCont, floaterContStyle, { width }]}
          onLayout={(event) => {
            const { height } = event.nativeEvent.layout;
            setViewHeight(height + PICKER_HEIGHT);
          }}
        >
          <View style={styles.arrowCont}>
            <>
              <Octicons
                name="triangle-up"
                size={42}
                color={BLUE_BUTTON}
                style={styles.arrow}
              />
              <Octicons
                name="triangle-up"
                size={40}
                color={WHITE}
                style={[styles.arrow, { right: 10.8 }]}
              />
            </>
          </View>

          <FlatList
            data={rows}
            style={[
              paddingStyles.p_8,
              paddingStyles.pl_0,
              borderStyles.bw_1,
              { borderColor: BLUE_BUTTON },
            ]}
            renderItem={(object) => (
              <TouchableOpacity
                style={[styles.rowCont, { backgroundColor: WHITE }]}
                onPress={() => setIndex(object.index)}
              >
                <View
                  style={[
                    styles.radioCont,
                    object.index === index ? { borderColor: BLUE_BUTTON } : {},
                  ]}
                >
                  <View
                    style={[
                      styles.radioInnerCont,
                      object.index === index
                        ? { backgroundColor: BLUE_BUTTON }
                        : null,
                    ]}
                  />
                </View>
                <Text style={[styles.rowText]}>{object.item.label}</Text>
              </TouchableOpacity>
            )}
            keyExtractor={(item, idx) => idx.toString()}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    position: 'absolute',
    alignItems: 'flex-end',
    zIndex: 1,
  },

  rowCont: {
    padding: 8,
    borderWidth: 0,
    marginBottom: 4,
    marginLeft: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },

  pickerCont: {
    position: 'absolute',
    top: 35,
    right: 0,
    backgroundColor: WHITE,
  },

  arrowCont: {
    height: 14,
    backgroundColor: BORDER,
    zIndex: 1,
    borderWidth: 0,
  },

  arrow: {
    position: 'absolute',
    right: 10,
    bottom: -14,
  },

  flatListCont: {
    backgroundColor: WHITE,
    borderColor: BLUE_BUTTON,
    borderRadius: 2,
    marginLeft: 'auto',
  },

  radioCont: {
    padding: 6,
    height: 10,
    width: 10,
    borderRadius: 10,
    marginRight: 8,
    borderWidth: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },

  radioInnerCont: {
    height: 8,
    width: 8,
    backgroundColor: WHITE,
    borderRadius: 8,
  },

  rowText: {
    color: TEXT_BLACK,
  },
});

export default FloatingPicker;
