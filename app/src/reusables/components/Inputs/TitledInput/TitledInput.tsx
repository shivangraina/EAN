import { Entypo } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import { BLUE_BUTTON, BORDER, OFFWHITE, WHITE } from '../../../styles/colors';
import MyText from '../../Texts/MyText';
import ErrorBelow from '../ErrorBelow';

const RED = 'red';
const GREEN = 'green';

interface Props {
  containerStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  textInputStyle?: StyleProp<ViewStyle>;
  config?: TextInputProps;
  title?: string;
  err?: { err: boolean };
  typed?: boolean;
  iconStyle?: StyleProp<ViewStyle>;
  secure?: boolean;
}

const TitledInputMessaged: React.FC<Props> = ({
  containerStyle,
  titleStyle,
  textInputStyle,
  config,
  title,
  err,
  typed,
  iconStyle,
  secure,
}) => {
  const ipRef = useRef(null);
  const showError = typed && err;

  const [visible, setvisible] = useState(secure);

  return (
    <View style={[styles.container, containerStyle]}>
      {title ? (
        <MyText style={[styles.title, titleStyle]}>
          {title.toUpperCase()}
        </MyText>
      ) : null}
      <TextInput
        ref={ipRef}
        style={[
          styles.inputContainer,
          textInputStyle,
          showError ? [{ borderColor: err?.err ? RED : GREEN }] : null,
          !(config?.editable || true) && { backgroundColor: OFFWHITE },
        ]}
        {...config}
        secureTextEntry={visible}
      />
      {secure ? (
        <Entypo
          style={[styles.iconCont, iconStyle, title ? { top: -5 } : {}]}
          onPress={() => setvisible((prevState) => !prevState)}
          name={visible ? 'eye' : 'eye-with-line'}
          size={18}
          color={BLUE_BUTTON}
        />
      ) : null}
      <ErrorBelow err={err} showError={showError} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative',
    backgroundColor: WHITE,
    // overflow: 'hidden',
    // marginBottom: 11.7,

    // My styles
    marginBottom: 19.7,
    borderWidth: 0,
  },

  inputContainer: {
    fontSize: 11.7,
    // height: 43.3,
    paddingLeft: 8,

    // My styles
    borderWidth: 1,
    borderRadius: 4,
    borderColor: BORDER,
    height: 33.3,
  },

  title: {
    color: BLUE_BUTTON,
  },

  icon: {
    width: 25,
  },

  iconCont: {
    position: 'absolute',
    right: 8,
    top: 8,
    zIndex: 1,
    borderWidth: 0,
  },
});

export default TitledInputMessaged;
