import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
	OnboardScreen: undefined,
	SignupScreen: undefined,
	LoginScreen: undefined,
	ForgotPasswordScreen: undefined,
	Tabs: undefined;
	InitScreen: undefined,
};

// eslint-disable-next-line prettier/prettier
export type RootNavRouteProps<T extends keyof RootStackParamList> = {
	navigation: StackNavigationProp<RootStackParamList, T>;
	route: RouteProp<RootStackParamList, T>;
};

export type RootNavProp<
	T extends keyof RootStackParamList = any
> = StackNavigationProp<RootStackParamList, T>;
