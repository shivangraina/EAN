import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions } from '@react-navigation/native';
import axios from 'axios';
import React from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux';
import Container from '../../reusables/components/Containers/Container';
import RowContainer from '../../reusables/components/Containers/RowContainer';
import WrappedScrollView from '../../reusables/components/Containers/WrappedScrollView';
import Avatar from '../../reusables/components/General/Avatar';
import Divider from '../../reusables/components/General/Divider';
import {
  BLUE_1,
  BLUE_BUTTON,
  BORDER,
  TEXT_BLACK_1,
} from '../../reusables/styles/colors';
import { marginStyles } from '../../reusables/styles/style';
import DifferentTexts from '../Common/DifferentTexts';
import TitleBottomText from '../Common/TitleBottomText';
import AcademicInfo from './AcademicInfo';

const ProfileScreen = ({ navigation }) => {
  const student = useSelector((state: AppState) => state.rootStore.student);

  const logoutPress = async () => {
    axios.defaults.headers.common.Authorization = '';

    await AsyncStorage.removeItem('token');

    const resetAction = CommonActions.reset({
      index: 0,
      routes: [{ name: 'OnboardScreen' }],
    });

    navigation.dispatch(resetAction);
  };
  return (
    <WrappedScrollView>
      <TitleBottomText
        title="Profile Page"
        text=""
        headStyle={marginStyles.mt_24}
      />
      <RowContainer contStyle={styles.row} justifyContent="flex-start">
        <Avatar
          iconSource={require('../../assets/profile.png')}
          size={80}
          iconContStyle={{ borderColor: BLUE_BUTTON }}
          contStyle={marginStyles.mr_16}
          /**
           * Issue open right now with axios react native file uploading
           * https://github.com/facebook/react-native/issues/28551

          changeAvatar={async (file) => {
            const formData = new FormData()
            formData.append('file', file)

            const res = await axios.post('profileUpload', formData, {
							headers: {
								'Content-Type': 'multipart/form-data',
							},
            });

          }}*/
        />
        <Container>
          <DifferentTexts
            text={`${student?.fName} ${student?.lName}`}
            fontSize={20}
            color={TEXT_BLACK_1}
            style={marginStyles.mtb_4}
          />
          <DifferentTexts text={student?.email} style={marginStyles.mb_2} />
          <DifferentTexts text={student?.regId} style={marginStyles.mb_2} />
        </Container>
      </RowContainer>
      <DifferentTexts
        text="Academic Information"
        fontSize={20}
        color={BLUE_1}
        style={[{ alignSelf: 'flex-start' }, marginStyles.mt_16]}
      />
      <Divider />
      <AcademicInfo student={student} />
      <Divider />
      <RowContainer
        onPress={logoutPress}
        disabled={false}
        justifyContent="flex-start"
        contStyle={styles.logoutRow}
      >
        <AntDesign name="logout" size={24} color="black" />
        <DifferentTexts
          style={marginStyles.ml_16}
          fontSize={16}
          text="Logout"
        />
      </RowContainer>
    </WrappedScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: BORDER,
    paddingBottom: 12,
    paddingTop: 12,
  },

  logoutRow: {
    padding: 12,
    paddingLeft: 2,
    marginTop: 16,
  },
});

export default ProfileScreen;
