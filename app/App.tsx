import axios from 'axios';
import { useFonts } from 'expo-font';
import React from 'react';
import { Alert, SafeAreaView, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import GlobalListener from './src/components/GlobalListener';
import NotificationContext from './src/contexts/NotificationContext';
import store from './src/redux/index';
import { RESET } from './src/redux/type';
import useNotification from './src/reusables/hooks/useNotifications';
import { OFFWHITE } from './src/reusables/styles/colors';
import Routes from './src/routes/Routes';

if (__DEV__) {
  axios.defaults.baseURL = 'http://192.168.31.24:8080/';
} else {
  axios.defaults.baseURL = 'https://eanbackend.herokuapp.com/';
}

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (err) => {
    const { dispatch } = store;
    if (err.response) {
      const { status } = err.response;
      if (status === 403) {
        dispatch({ type: RESET });
      }
    } else {
      // Network error
      console.log(err, 'App.tsx');
      Alert.alert('Error', 'Network Error');
    }

    return Promise.reject(err);
  }
);

export default function App() {
  let [fontsLoaded] = useFonts({
    acuminpro: require('./src/assets/fonts/Acumin-RPro.otf'),
    acuminprobold: require('./src/assets/fonts/Acumin-BdPro.otf'),
    acuminprosemi: require('./src/assets/fonts/AcuminPro-Medium.otf'),
  });

  const notification = useNotification();

  return (
    <Provider store={store}>
      <NotificationContext.Provider value={notification}>
        <StatusBar backgroundColor={OFFWHITE} barStyle="dark-content" />
        <SafeAreaView style={[{ flex: 1 }]}>
          <GlobalListener />
          {fontsLoaded ? <Routes /> : null}
        </SafeAreaView>
      </NotificationContext.Provider>
    </Provider>
  );
}
