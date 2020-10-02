import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useState, useRef } from 'react';
import { Alert } from 'react-native';
import Button from '../../reusables/components/Buttons/Button';
import TitledInputMessaged from '../../reusables/components/Inputs/TitledInput/TitledInput';
import MyText from '../../reusables/components/Texts/MyText';
import { BLACK_1 } from '../../reusables/styles/colors';
import { marginStyles } from '../../reusables/styles/style';
import { getInputConfig } from '../Signup/Common';
import CartCont from './CartCont';
import { inputStyle, stepStyle } from './commonStyles';
import { validate } from './validate';

const ResetScreen = ({ values, selected }) => {
  const nav = useNavigation();
  const submitted = useRef(false);

  const [inputs, setInputs] = useState({
    password: getInputConfig(''),
    confPassword: getInputConfig(''),
  });

  const handleTextChangeFunc = (field, value) => {
    let newFields;
    if (submitted.current) {
      newFields = validate(field, value, inputs, submitted.current);
    } else {
      newFields = { ...inputs };
      const newField = { ...newFields[field], value };
      newFields[field] = newField;
    }
    setInputs(newFields);
  };

  const handlePress = async () => {
    try {
      let flag = false;
      submitted.current = true;

      const newFields = validate('all', '', inputs, true);
      Object.keys(newFields).map((field) => {
        if (newFields[field].err.err) {
          flag = true;
        }
      });
      if (flag) {
        setInputs(newFields);
      } else {
        const { status } = await axios.post('auth/reset-password', {
          email: values.email,
          password: inputs.password.value,
          type: 'student',
        });
        if (status === 200) {
          Alert.alert('Success', 'Password Reset Successfully');
          nav.navigate('LoginScreen');
        }
      }
    } catch (err) {
      if (err?.response) {
        Alert.alert('Error', err.response.data);
      }
    }
  };

  return (
    <CartCont selected={selected}>
      <MyText style={stepStyle}>Step 2</MyText>
      <MyText>Reset Password</MyText>
      <TitledInputMessaged
        containerStyle={inputStyle}
        config={{
          editable: selected,
          placeholder: 'Password',
          placeholderTextColor: BLACK_1,
          value: inputs.password.value,
          onChangeText: (value) => {
            handleTextChangeFunc('password', value);
          },
        }}
        err={inputs.password.err}
        typed={inputs.password.typed}
        secure
      />
      <TitledInputMessaged
        containerStyle={marginStyles.mt_12}
        config={{
          editable: selected,
          placeholder: 'Confirm Password',
          placeholderTextColor: BLACK_1,
          value: inputs.confPassword.value,
          onChangeText: (value) => {
            handleTextChangeFunc('confPassword', value);
          },
        }}
        err={inputs.confPassword.err}
        typed={inputs.confPassword.typed}
        secure
      />
      <Button
        disabled={!selected}
        title="Reset Password"
        long
        handlePress={async () => {
          if (selected) {
            await handlePress();
          }
          // validate
        }}
      />
    </CartCont>
  );
};
export default ResetScreen;
