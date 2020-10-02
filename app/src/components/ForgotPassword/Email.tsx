import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import React from 'react';
import { Alert } from 'react-native';
import RowContainer from '../../reusables/components/Containers/RowContainer';
import TitledInputMessaged from '../../reusables/components/Inputs/TitledInput/TitledInput';
import MyText from '../../reusables/components/Texts/MyText';
import { BLACK_1, BLUE_BUTTON } from '../../reusables/styles/colors';
import CartCont from './CartCont';
import { inputStyle, stepStyle } from './commonStyles';

const Email = ({ setScreenFlag, setValues, values, selected }) => {
  const handlePress = async () => {
    try {
      const { status } = await axios.post('auth/reset-password-link', {
        email: values.email,
        type: 'student',
      });

      if (status === 200) {
        setScreenFlag(2);
      }
    } catch (err) {
      if (err?.response) {
        if (err.response.status === 403) {
          Alert.alert('Error', 'Enter Email Registered with EAN');
        }
      }
    }
  };

  return (
    <CartCont selected={selected}>
      <MyText style={stepStyle}>Step 1</MyText>
      <MyText>Enter Email</MyText>
      <RowContainer>
        <TitledInputMessaged
          containerStyle={inputStyle}
          config={{
            placeholder: 'abc@gmail.com',
            placeholderTextColor: BLACK_1,
            value: values.email,
            onChangeText: (value) =>
              setValues((prevValues) => ({ ...prevValues, email: value })),
          }}
        />
        <MaterialCommunityIcons
          name="send"
          size={30}
          color={BLUE_BUTTON}
          style={{ marginTop: 4 }}
          onPress={async () => {
            if (selected) {
              await handlePress();
            }
          }}
        />
      </RowContainer>
    </CartCont>
  );
};
export default Email;
