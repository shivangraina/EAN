import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';
import React from 'react';
import { Alert } from 'react-native';
import RowContainer from '../../reusables/components/Containers/RowContainer';
import TitledInputMessaged from '../../reusables/components/Inputs/TitledInput/TitledInput';
import MyText from '../../reusables/components/Texts/MyText';
import { BLACK_1, BLUE_BUTTON } from '../../reusables/styles/colors';
import CartCont from './CartCont';
import { stepStyle, inputStyle } from './commonStyles';

const OTP = ({ setScreenFlag, setValues, values, selected }) => {
  const handlePress = async () => {
    try {
      await axios.post('auth/reset-password-otp', {
        email: values.email,
        otp: values.otp,
        type: 'student',
      });
      setScreenFlag(3);
    } catch (err) {
      if (err?.response) {
        Alert.alert('Error', err.response.data);
      }
    }
  };
  return (
    <CartCont selected={selected}>
      <MyText style={stepStyle}>Step 2</MyText>
      <MyText>Enter OTP</MyText>
      <RowContainer>
        <TitledInputMessaged
          containerStyle={inputStyle}
          config={{
            editable: selected,
            placeholder: '123456',
            placeholderTextColor: BLACK_1,
            value: values.otp,
            onChangeText: (value) =>
              setValues((prevValues) => ({ ...prevValues, otp: value })),
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
export default OTP;
