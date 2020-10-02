import { Entypo } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import { BLUE_BUTTON, BORDER, WHITE } from '../../../styles/colors';
import { CommonCompStyles } from '../../../types/common_types';
import MyText from '../../Texts/MyText';

const iconWidth = 25;

interface Props extends CommonCompStyles {
  titleStyle?: StyleProp<TextStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  config?: TextInputProps;
  title?: string;
}

const PasswordInput: React.FC<Props> = ({
  containerStyle,
  titleStyle,
  textInputStyle,
  config,
  title,
  iconStyle,
  iconContStyle,
}) => {
  const [visible, setvisible] = useState(true);

  return (
    <View style={[styles.container, containerStyle]}>
      {title ? (
        <MyText style={[styles.title, titleStyle]}>
          {title.toUpperCase()}
        </MyText>
      ) : (
        <></>
      )}
      <TextInput
        style={[styles.inputContainer, textInputStyle]}
        secureTextEntry={visible}
        maxLength={40}
        {...config}
      />
      <TouchableOpacity
        style={[styles.iconCont, iconContStyle, title ? { top: -5 } : {}]}
        onPress={() => setvisible((prevState) => !prevState)}
      >
        <Entypo
          name={visible ? 'eye' : 'eye-with-line'}
          size={18}
          color={BLUE_BUTTON}
          style={iconStyle}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: 16,
    position: 'relative',
    backgroundColor: WHITE,
    borderWidth: 0,
  },

  inputContainer: {
    borderRadius: 4,
    width: '100%',
    borderColor: BORDER,
    backgroundColor: WHITE,
    letterSpacing: 0.3,
    padding: 4,
    paddingLeft: 6,
    fontSize: 13,
    borderWidth: 1,
    height: 30,
  },

  title: {
    color: BLUE_BUTTON,
    marginBottom: 8,
  },

  icon: {
    width: iconWidth,
  },

  iconCont: {
    position: 'absolute',
    justifyContent: 'flex-end',
    right: 8,
    bottom: 5,
    zIndex: 1,
    borderWidth: 0,
    marginRight: 2,
  },
});

export default PasswordInput;
