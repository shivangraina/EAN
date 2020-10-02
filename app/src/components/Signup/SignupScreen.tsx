import React, { useState } from 'react';
import FlexedContainer from '../../reusables/components/Containers/FlexedContainer';
import { RootNavProp } from '../../routes/types/RootStackParamList';
import Page1 from './Page1';

interface Props {
  navigation: RootNavProp<'SignupScreen'>;
}

const SignupScreen: React.FC<Props> = () => {
  const stateSignup = useState({
    fName: '',
    lName: '',
    email: '',
    regId: '',
    birthDate: '',
    password: '',
    confPassword: '',
  });

  return (
    <FlexedContainer align="center">
      <Page1 stateSignup={stateSignup} />
    </FlexedContainer>
  );
};

export default SignupScreen;
