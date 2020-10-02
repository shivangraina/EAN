import { MaterialIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { StyleSheet, View, ImagePickerResult, Alert } from 'react-native';
import { BLUE_BUTTON, TEXT_BLACK, TEXT_BLACK_1 } from '../../styles/colors';
import {
  CommonCompStyles,
  StyText,
  TouchableOpacityOnPress,
} from '../../types/common_types';
import ImageButton from '../Buttons/ImageButton';
import MyText from '../Texts/MyText';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';

interface Props extends CommonCompStyles {
  size: number;
  title?: string;
  titleStyle?: StyText;
  subTitle?: string;
  subTitleStyle?: StyText;
  iconPress?: TouchableOpacityOnPress;
  padding?: number;
  changeAvatar?: (uri: ImagePickerResult) => void;
}

const Avatar: React.FC<Props> = ({
  title,
  titleStyle,
  contStyle,
  subTitle,
  subTitleStyle,
  iconPress,
  renderIcon,
  iconSource,
  size,
  iconStyle,
  iconContStyle,
  changeAvatar,
}) => {
  const getPermissionAsync = async () => {
    if (Constants.platform?.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        Alert.alert(
          'Sorry, we need camera roll permissions to make this work!'
        );
      }
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.cancelled) {
        console.log('Canceled');
      }

      changeAvatar?.(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (changeAvatar) {
      getPermissionAsync();
    }
  }, []);

  return (
    <View style={[styles.container, contStyle]}>
      <ImageButton
        handlePress={iconPress}
        size={size}
        circle
        renderIcon={renderIcon}
        iconSource={iconSource}
        iconStyle={iconStyle}
        iconContStyle={iconContStyle}
      />
      {changeAvatar && (
        <MaterialIcons
          name="edit"
          size={24}
          color={BLUE_BUTTON}
          style={styles.editIcon}
          onPress={pickImage}
        />
      )}
      {title ? (
        <View style={styles.titleCont}>
          <MyText style={[styles.title, titleStyle]}>{title}</MyText>
          <MyText style={[styles.subTitle, subTitleStyle]}>{subTitle}</MyText>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },

  titleCont: {
    alignItems: 'center',
    marginTop: 8,
  },

  title: {
    color: TEXT_BLACK,
    fontSize: 13,
  },

  subTitle: {
    color: TEXT_BLACK_1,
    fontSize: 12,
  },

  editIcon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

export default Avatar;
