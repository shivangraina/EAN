import AsyncStorage from '@react-native-community/async-storage';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import React, { useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';
import { getStudentYBDB } from '../../constants/Utils';
import { AppState } from '../../redux';
import { setStudent } from '../../redux/actions';
import { AppActionsType } from '../../redux/type';
import CenteredContainer from '../../reusables/components/Containers/CenteredContainer';
import useDidUpdate from '../../reusables/hooks/useDidUpdate';
import { RootNavProp } from '../../routes/types/RootStackParamList';

interface Props {
  navigation: RootNavProp<'LoginScreen'>;
}

const InitScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch<Dispatch<AppActionsType>>();
  const student = useSelector((state: AppState) => state.rootStore.student);
  const isFocused = useIsFocused();

  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;

        const studentDecoded = jwt_decode(token);

        dispatch(
          setStudent({ ...studentDecoded, ...getStudentYBDB(studentDecoded) })
        );
      } else {
        navigation.replace('OnboardScreen');
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useDidUpdate(() => {
    if (isFocused) {
      navigation.replace('Tabs');
    }
  }, [student]);

  return (
    <CenteredContainer>
      <ActivityIndicator size="large" />
    </CenteredContainer>
  );
};

export default InitScreen;
