import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { BLUE_1, OFFWHITE, TEXT_BLACK } from '../../../styles/colors';
import MyText from '../../Texts/MyText';

const TabComponent = (props) => {
  let selStyle;
  let selTextStyle;

  if (!props.selected) {
    selStyle = {
      borderColor: OFFWHITE,
    };

    selTextStyle = {
      color: TEXT_BLACK,
    };
  }

  return (
    <TouchableOpacity
      onPress={() => props.handlePress(props.index)}
      style={[styles.container, selStyle]}
    >
      <MyText style={[styles.textStyle, selTextStyle]}>
        {props.title.toUpperCase()}
      </MyText>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '33.34%',
    borderBottomWidth: 2.5,
    borderRadius: 0,
    // backgroundColor: WHITE,
    elevation: 0,
    flexDirection: 'column',
    borderColor: BLUE_1,
    justifyContent: 'center',
  },

  textStyle: {
    textAlign: 'center',
    color: BLUE_1,
    fontSize: 12,
    fontFamily: 'acuminprobold',
  },
});

export default TabComponent;
