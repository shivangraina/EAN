import React from 'react';
import MyText from '../../reusables/components/Texts/MyText';
import { TextStyle, StyleProp, TextProps } from 'react-native';

const fontLevel = {
  1: { fontSize: 11 },
  2: { fontSize: 13 },
  3: { fontSize: 15 },
  4: { fontSize: 18 },
  5: { fontSize: 23.3 },
};

const familyFont = {
  semi: 'acuminprosemi',
  bold: 'acuminprobold',
};

interface Props extends TextProps {
  text?: string;
  level?: 1 | 2 | 3 | 4 | 5;
  color?: string;
  fontSize?: number;
  family?: 'semi' | 'bold';
  style?: StyleProp<TextStyle>;
  textAlign?: 'center' | 'left' | 'right';
}

const DifferentTexts: React.FC<Props> = ({
  text,
  color,
  family,
  style,
  textAlign,
  level,
  fontSize,
  ...rest
}) => {
  return (
    <MyText
      style={[
        color ? { color } : null,
        level ? fontLevel[level] : null,
        family ? { fontFamily: familyFont[family] } : null,
        textAlign ? { textAlign } : null,
        fontSize ? { fontSize } : null,
        style,
      ]}
      {...rest}
    >
      {text}
    </MyText>
  );
};

export default DifferentTexts;
