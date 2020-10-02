import React from 'react';
import { Image, StyleSheet } from 'react-native';
import Button from '../../reusables/components/Buttons/Button';
import FlexedContainer from '../../reusables/components/Containers/FlexedContainer';
import { RootNavProp } from '../../routes/types/RootStackParamList';
import NestedText from '../Common/NestedText';
import TitleBottomText from '../Common/TitleBottomText';
import Avatar from '../../reusables/components/General/Avatar';
import { TEXT_BLACK_1 } from '../../reusables/styles/colors';
import { positionStyles, paddingStyles } from '../../reusables/styles/style';

interface Props {
  navigation: RootNavProp<'OnboardScreen'>;
}

const OnBoardScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <FlexedContainer contStyle={[positionStyles.alc, paddingStyles.plr_16]}>
      <Avatar
        iconSource={require('../../assets/PICT-Logo.jpg')}
        size={80}
        contStyle={{ paddingTop: 40 }}
      />
      <TitleBottomText
        title="PICT EAN APP"
        headStyle={{ marginTop: 0, color: TEXT_BLACK_1 }}
      />
      <Image
        style={styles.img}
        resizeMode="contain"
        source={require('../../assets/onboard.png')}
      />

      <Button
        title="Getting Started"
        contStyle={styles.button}
        handlePress={() => navigation.navigate('LoginScreen')}
        long
      />
      <NestedText
        text="Already have an account? "
        textNested="Log in"
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </FlexedContainer>
  );
};

const styles = StyleSheet.create({
  img: {
    width: 326.7,
    height: 245,
    marginTop: 16,
  },

  button: {
    marginTop: 'auto',
  },
});

export default OnBoardScreen;
