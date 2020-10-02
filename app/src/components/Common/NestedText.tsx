import React from 'react';
import { StyleSheet } from 'react-native';
import MyText from '../../reusables/components/Texts/MyText';
import { BLACK_1, BLUE_BUTTON } from '../../reusables/styles/colors';
import { getTextStyle, textColor } from '../../reusables/styles/textStyles';
import { TouchableOpacityOnPress } from '../../reusables/types/common_types';

interface Props {
  text: string;
  textNested: string;
  onPress?: TouchableOpacityOnPress;
}

const NestedText: React.FC<Props> = ({ text, textNested, onPress }) => {
  return (
    <MyText style={[styles.textBottom, getTextStyle(BLACK_1, 11)]}>
      {text}
      <MyText onPress={onPress} style={textColor(BLUE_BUTTON)}>
        {textNested}
      </MyText>
    </MyText>
  );
};

const styles = StyleSheet.create({
  textBottom: {
    textAlign: 'center',
    marginTop: 13.3,
    marginBottom: 33.3,
  },
});

export default NestedText;
