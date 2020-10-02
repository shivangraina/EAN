import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet } from 'react-native';
import NoticeScreen from '../components/Notices/NoticeScreen';
import NoticeSelected from '../components/Notices/Tabs/NoticeSelected';
import ProfileScreen from '../components/Profile/ProfileScreen';
import Container from '../reusables/components/Containers/Container';
import MyText from '../reusables/components/Texts/MyText';
import { BLUE_BUTTON, OFFWHITE } from '../reusables/styles/colors';
import { getCircleStyle, marginStyles } from '../reusables/styles/style';
import { BottomTabsParamList } from './types/BottomTabsParamList';

const Tab = createBottomTabNavigator<BottomTabsParamList>();
const Stack = createStackNavigator();

const NoticeStack = () => (
  <Stack.Navigator
    initialRouteName="Notices"
    screenOptions={{ header: () => null }}
  >
    <Stack.Screen name="Notices" component={NoticeScreen} />
    <Stack.Screen name="SelectedNotice" component={NoticeSelected} />
  </Stack.Navigator>
);

function BottomTabs() {
  return (
    <Tab.Navigator tabBarOptions={getTabBarOptions()}>
      <Tab.Screen
        name="NoticeStack"
        component={NoticeStack}
        options={getTabBarIcon(require('../assets/home_1.png'), 'EAN')}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={getTabBarIcon(null, 'Profile', true)}
      />
    </Tab.Navigator>
  );
}

const TAB_BAR_HEIGHT = 56.7;
const TAB_BAR_ICON_SIZE = 20;

const getTabBarOptions = () => ({
  activeTintColor: BLUE_BUTTON,
  inactiveTintColor: 'grey',
  style: {
    height: TAB_BAR_HEIGHT,
    backgroundColor: OFFWHITE,
  },
  labelStyle: {
    fontSize: 9.3,
  },
});

const getTabBarIcon = (
  // eslint-disable-next-line prettier/prettier
	source: ImageSourcePropType,
  name: string,
  icon?: boolean,
  tint = true
) => ({
  tabBarLabel: ({ color }) => (
    <MyText style={[styles.tabTitle, { color }]}>{name}</MyText>
  ),
  tabBarIcon: ({ color }) =>
    icon ? (
      <FontAwesome
        name="user"
        size={TAB_BAR_ICON_SIZE}
        color={color}
        style={{ marginTop: 6 }}
      />
    ) : (
      <Container
        contStyle={[getCircleStyle(TAB_BAR_ICON_SIZE), marginStyles.mt_8]}
      >
        <Image
          source={source}
          style={[styles.tabIcon, tint ? { tintColor: color } : null]}
          resizeMode="contain"
        />
      </Container>
    ),
});

const styles = StyleSheet.create({
  tabIcon: {
    // marginTop: 6,
    width: TAB_BAR_ICON_SIZE,
  },

  tabTitle: {
    fontSize: 9.3,
    marginBottom: 10,
  },
});

export default BottomTabs;
