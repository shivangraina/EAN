import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import LoginScreen from '../components/Login/LoginScreen';
import OnBoardScreen from '../components/OnBoard/OnBoardScreen';
import SignupScreen from '../components/Signup/SignupScreen';
import { RootStackParamList } from './types/RootStackParamList';
import BottomTabs from './Tabs';
import InitScreen from '../components/InitScreen/InitScreen';
import NavigatorService from '../reusables/Utils/NavigatorService';
import ForgotPasswordScreen from '../components/ForgotPassword/ForgotPasswordScreen';

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  React.useEffect(() => {
    NavigatorService.isMountedRef.current = true;

    return () => {
      NavigatorService.isMountedRef.current = false;
    };
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="InitScreen"
      screenOptions={{ header: () => null }}
    >
      <Stack.Screen name="InitScreen" component={InitScreen} />
      <Stack.Screen name="OnboardScreen" component={OnBoardScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="Tabs" component={BottomTabs} />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};

const Routes = () => {
  return (
    <NavigationContainer ref={NavigatorService.navigationRef}>
      <RootStack />
    </NavigationContainer>
  );
};

export default Routes;
