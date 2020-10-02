import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { NoticeItemType } from '../../redux/type';
import { ListItemProps } from '../../components/Notices/Tabs/common';

export type NoticeStackParamList = {
	Notices: undefined;
	SelectedNotice: {
		notice: ListItemProps;
	};
};

// eslint-disable-next-line prettier/prettier
export type NoticeNavRouteProps<T extends keyof NoticeStackParamList> = {
	navigation: StackNavigationProp<NoticeStackParamList, T>;
	route: RouteProp<NoticeStackParamList, T>;
};

export type NoticeNavProp<
	T extends keyof NoticeStackParamList = any
> = StackNavigationProp<NoticeStackParamList, T>;
