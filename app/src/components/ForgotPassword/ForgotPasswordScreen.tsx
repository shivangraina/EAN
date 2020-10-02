import React, { useState } from 'react';
import FlexedContainer from '../../reusables/components/Containers/FlexedContainer';
import OTP from './OTP';
import ResetScreen from './ResetPassword';
import Email from './Email';
import { ScrollView } from 'react-native-gesture-handler';
import TitleBottomText from '../Common/TitleBottomText';

const ForgotPasswordScreen = () => {
  const [screenFlag, setScreenFlag] = useState(1);
  const [values, setValues] = useState({
    email: '',
    otp: '',
  });

  const props = { setScreenFlag, screenFlag, values, setValues };

  return (
    <FlexedContainer padding align="center">
      <TitleBottomText
        back
        title="Forget Password"
        text=""
        headStyle={{ marginTop: 28.3 }}
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ width: '100%' }}
      >
        <Email {...props} selected={screenFlag === 1} />
        <OTP {...props} selected={screenFlag === 2} />
        <ResetScreen {...props} selected={screenFlag === 3} />
      </ScrollView>
    </FlexedContainer>
  );
};

export default ForgotPasswordScreen;
