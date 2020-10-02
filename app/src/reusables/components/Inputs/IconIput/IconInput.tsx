import React from 'react';
import {
  Image,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import { BORDER, WHITE } from '../../../styles/colors';
import { getSquare } from '../../../styles/style';
import {
  CommonCompStyles,
  TouchableOpacityOnPress,
} from '../../../types/common_types';
import MyText from '../../Texts/MyText';

interface Props extends CommonCompStyles {
  textInputStyle?: StyleProp<TextStyle>;
  config?: TextInputProps;

  handlePress?: TouchableOpacityOnPress;
  touch?: boolean;
  size?: number;
}

const IconInput: React.FC<Props> = ({
  contStyle,
  textInputStyle,
  iconSource,
  iconStyle,
  renderIcon,
  config,

  handlePress,
  touch,
  size,
}) => (
  <TouchableOpacity
    disabled={!touch}
    onPress={handlePress}
    style={[styles.searchBox, contStyle]}
  >
    <View style={styles.iconCont}>
      {iconSource && size ? (
        <Image
          source={iconSource}
          style={[iconStyle, { ...getSquare() }]}
          resizeMode="contain"
        />
      ) : renderIcon ? (
        renderIcon()
      ) : null}
    </View>
    {touch ? (
      <View style={styles.inputContainer}>
        <MyText
          style={[
            styles.input,
            {
              color: config?.placeholderTextColor,
            },
          ]}
        >
          {config?.placeholder}
        </MyText>
      </View>
    ) : (
      <TextInput style={[styles.textInput, textInputStyle]} {...config} />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  searchBox: {
    width: '90%',
    marginTop: 16,
    marginBottom: 16,
    position: 'relative',
    flexDirection: 'row',
    padding: 2,
    backgroundColor: WHITE,
    borderColor: BORDER,
    borderRadius: 30,
    height: 30,
    borderWidth: 1,
    overflow: 'hidden',
  },

  textInput: {
    borderRadius: 4,
    flex: 1,
    backgroundColor: WHITE,
    letterSpacing: 0.3,
    fontSize: 13,
  },

  input: {
    fontSize: 12,
  },

  inputContainer: {
    borderRadius: 4,
    flex: 1,
    backgroundColor: WHITE,
    letterSpacing: 0.3,
    justifyContent: 'center',
  },

  icon: {
    width: 15,
  },

  iconCont: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
    marginRight: 8,
  },
});

export default IconInput;
