import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp } from '@react-navigation/native';

export type BottomTabsParamList = {
	NoticeStack: undefined;
	Profile: undefined;
};

// eslint-disable-next-line prettier/prettier
export type TabsNavRouteProps<T extends keyof BottomTabsParamList> = {
	navigation: BottomTabNavigationProp<BottomTabsParamList, T>;
	route: RouteProp<BottomTabsParamList, T>;
};

export type TabsNavProp<
	T extends keyof BottomTabsParamList
> = BottomTabNavigationProp<BottomTabsParamList, T>;
