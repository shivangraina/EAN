import { Dimensions, Platform } from 'react-native';

export const PLATFORM = Platform.OS;
export const IS_WEB = PLATFORM === 'web';

export const getWidth = () => Dimensions.get('screen').width;

export const getHeight = () => Dimensions.get('screen').height;
