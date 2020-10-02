import React from 'react';
import { StyleSheet } from 'react-native';
import MyText from '../../reusables/components/Texts/MyText';
import { BLACK_1, TEXT_BLACK_1 } from '../../reusables/styles/colors';
import { StyText } from '../../reusables/types/common_types';
import Container from '../../reusables/components/Containers/Container';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface Props {
  title: string;
  text: string;
  headStyle?: StyText;
  textStyle?: StyText;
  back?: boolean;
}

const TitleBottomText: React.FC<Props> = ({
  title,
  text,
  headStyle,
  textStyle,
  back,
}) => {
  const nav = useNavigation();
  return (
    <Container align="center" w100 justify="center">
      {back ? (
        <Ionicons
          name="md-arrow-round-back"
          size={28}
          color="black"
          style={{ position: 'absolute', left: 0 }}
          onPress={() => nav.goBack()}
        />
      ) : null}
      <MyText style={[styles.head, headStyle]}>{title}</MyText>
      <MyText style={[styles.text, textStyle]}>{text}</MyText>
    </Container>
  );
};

const styles = StyleSheet.create({
  head: {
    fontSize: 23.3,
    fontFamily: 'acuminprobold',
    color: TEXT_BLACK_1,
  },

  text: {
    fontSize: 11,
    color: BLACK_1,
    marginTop: 8.3,
    textAlign: 'center',
  },
});

export default TitleBottomText;
