import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  GestureResponderEvent,
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import DialogModal from '../General/DialogModal/DialogModal';
import MyText from '../Texts/MyText';
import { getSquare } from '../../styles/style';
import {
  OFFWHITE,
  BORDER,
  GREY_1,
  BUTTON_DISABLED,
  TEXT_BLACK_1,
} from '../../styles/colors';
import { getWidth } from '../../Utils/DeviceInfo';

type TouchableOpacityOnPress =
  | ((event: GestureResponderEvent) => void)
  | undefined;

interface Props {
  title: string;
  container?: StyleProp<ViewStyle>;
  leftNav?: TouchableOpacityOnPress;
  leftSource?: ImageSourcePropType;
  iconLeft?: ImageStyle;
  iconRight?: ImageStyle;
  heading?: StyleProp<TextStyle>;
  rightNav?: TouchableOpacityOnPress;
  rightSource?: ImageSourcePropType;
  size?: number;
  backButtonOverride?: TouchableOpacityOnPress;
  backButton?: boolean;
  dataPresent?: boolean;
}

const Header: React.FC<Props> = ({
  container,
  leftNav,
  leftSource,
  iconLeft,
  iconRight,
  heading,
  title,
  rightNav,
  rightSource,
  size = 30,
  backButtonOverride,
  backButton = false,
  dataPresent = false,
}) => {
  const navigation = useNavigation();
  const backNav = backButtonOverride || (() => navigation.goBack());
  const [diagVisible, setDiagVisible] = useState(false);
  return (
    <View style={[styles.container, container]}>
      <DialogModal
        visible={diagVisible}
        setVisible={setDiagVisible}
        title="Data you entered will be lost, do you want to go back?"
        buttonLeftText="Cancel"
        buttonRightText="Go Back"
        buttonRightPress={(e) => {
          backNav(e);
          setDiagVisible(false);
        }}
        buttonLeftPress={() => setDiagVisible(false)}
        buttonLeftContStyle={{ backgroundColor: BUTTON_DISABLED }}
        buttonRightContStyle={{ backgroundColor: TEXT_BLACK_1 }}
      />
      <TouchableOpacity
        onPress={
          backButton
            ? dataPresent
              ? () => setDiagVisible(true)
              : backNav
            : leftNav
        }
        style={[styles.butt, { borderRadius: size, left: 12 }]}
      >
        <Image
          source={backButton ? require('../../../assets/back.png') : leftSource}
          style={[styles.iconLeft, iconLeft, getSquare(size)]}
        />
      </TouchableOpacity>
      <MyText style={[styles.heading, heading]}>{title}</MyText>
      <TouchableOpacity
        onPress={rightNav}
        style={[styles.butt, { borderRadius: size, right: 12 }]}
      >
        {rightSource ? (
          <Image
            source={rightSource}
            style={[styles.iconRight, iconRight, getSquare(size)]}
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: getWidth(),
    backgroundColor: OFFWHITE,
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: BORDER,
  },

  heading: {
    color: GREY_1,
    fontSize: 18,
  },

  iconLeft: {
    width: 30,
    height: 30,
  },

  iconRight: {
    width: 30,
    height: 30,
  },

  butt: {
    overflow: 'hidden',
    position: 'absolute',
  },
});

export default Header;
