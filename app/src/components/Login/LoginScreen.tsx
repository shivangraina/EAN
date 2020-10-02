import AsyncStorage from '@react-native-community/async-storage';
import { CommonActions, useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import qs from 'query-string';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentYBDB } from '../../constants/Utils';
import { setStudent } from '../../redux/actions';
import { AppState } from '../../redux/index';
import Button from '../../reusables/components/Buttons/Button';
import FlexedContainer from '../../reusables/components/Containers/FlexedContainer';
import TitledInputMessaged from '../../reusables/components/Inputs/TitledInput/TitledInput';
import useDidUpdate from '../../reusables/hooks/useDidUpdate';
import { BLACK_1, TEXT_BLACK_1 } from '../../reusables/styles/colors';
import { RootNavProp } from '../../routes/types/RootStackParamList';
import NestedText from '../Common/NestedText';
import TitleBottomText from '../Common/TitleBottomText';
import { StudentType } from '../../redux/type';
import MyText from '../../reusables/components/Texts/MyText';

interface Props {
  navigation: RootNavProp<'LoginScreen'>;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const student = useSelector((state: AppState) => state.rootStore.student);
  const isFocused = useIsFocused();

  const handlePress = () => {
    setLoading(true);
    (async () => {
      try {
        const { data } = await axios.post('auth/login', qs.stringify(values), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        });

        const token = data.access_token;
        axios.defaults.headers.common.Authorization = `Bearer ${token}`;

        await AsyncStorage.setItem('token', token);

        const studentDecoded = jwt_decode<StudentType>(token);

        dispatch(
          setStudent({ ...studentDecoded, ...getStudentYBDB(studentDecoded) })
        );
      } catch (err) {
        setLoading(false);
        if (err?.response) {
          const { status } = err.response;
          if (status === 403 || status === 422) {
            Alert.alert(
              'Invalid Credentials',
              'Username or password incorrect'
            );
          }
          if (status === 401) {
            Alert.alert('Inactive', 'Account Not Activated.');
          }
        }
      }
    })();
  };

  useDidUpdate(() => {
    setLoading(false);
    if (isFocused) {
      const resetAction = CommonActions.reset({
        index: 0,
        routes: [{ name: 'Tabs' }],
      });

      navigation.dispatch(resetAction);
    }
  }, [student]);

  return (
    <FlexedContainer padding align="center">
      <TitleBottomText
        back
        title="Log In"
        text="Please log in to continue"
        headStyle={{ marginTop: 28.3 }}
      />
      <TitledInputMessaged
        containerStyle={{ marginTop: 46.7 }}
        config={{
          placeholder: 'Email',
          placeholderTextColor: BLACK_1,
          value: values.email,
          onChangeText: (value) =>
            setValues((prevValues) => ({ ...prevValues, email: value })),
        }}
      />
      <TitledInputMessaged
        containerStyle={{ marginBottom: 8 }}
        config={{
          placeholder: 'Password',
          placeholderTextColor: BLACK_1,
          value: values.password,
          onChangeText: (value) =>
            setValues((prevValues) => ({ ...prevValues, password: value })),
        }}
        secure
      />
      <MyText
        style={{
          alignSelf: 'flex-start',
          marginBottom: 23.3,
          marginLeft: 4,
          fontSize: 11,
          color: TEXT_BLACK_1,
        }}
        onPress={() => navigation.navigate('ForgotPasswordScreen')}
      >
        Forgot Password ?
      </MyText>
      <Button title="Log In" long handlePress={handlePress} loading={loading} />
      <NestedText
        text="Don't have an account? "
        textNested="Sign up"
        onPress={() => navigation.navigate('SignupScreen')}
      />
    </FlexedContainer>
  );
};

export default LoginScreen;
