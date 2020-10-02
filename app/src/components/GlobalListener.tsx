import { CommonActions } from '@react-navigation/native';
import React from 'react';
import { Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { getStudent } from '../redux/selectors';
import useDidUpdate from '../reusables/hooks/useDidUpdate';
import NavigatorService from '../reusables/Utils/NavigatorService';
import AsyncStorage from '@react-native-community/async-storage';

const GlobalListener: React.FC = () => {
  const student = useSelector(getStudent);

  useDidUpdate(() => {
    // If store is reset due to token expiry
    (async () => {
      if (!student) {
        await AsyncStorage.removeItem('token');
        Alert.alert(
          'Session Expired',
          'Session expired, Log In again to continue'
        );
        const resetAction = CommonActions.reset({
          index: 0,
          routes: [{ name: 'OnboardScreen' }],
        });

        NavigatorService.dispatchAction(resetAction);
      }
    })();
  }, [student]);
  return <></>;
};

export default GlobalListener;
