import {
  GestureResponderEvent,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  ImageSourcePropType,
  TouchableOpacityProps,
  TextProps,
  ViewProps,
} from 'react-native';

export type TouchableOpacityOnPress =
  | ((event: GestureResponderEvent) => void)
  | undefined;

export type StyView = StyleProp<ViewStyle>;
export type StyText = StyleProp<TextStyle>;
export type StyImg = StyleProp<ImageStyle>;

export interface CommonCompStyles {
  contStyle?: StyView;
  containerStyle?: StyView;
  textStyle?: StyText;

  iconSource?: ImageSourcePropType;
  renderIcon?: () => JSX.Element;
  iconContStyle?: StyView;
  iconStyle?: StyImg;

  touchConfig?: TouchableOpacityProps;
  textConfig?: TextProps;
  viewConfig?: ViewProps;
}
