import React, { useRef, useState, useContext } from 'react';
import Button from '../../reusables/components/Buttons/Button';
import Container from '../../reusables/components/Containers/Container';
import RowContainer from '../../reusables/components/Containers/RowContainer';
import TitleBottomText from '../Common/TitleBottomText';
import {
  Form,
  getInputConfig,
  handlePressFunc,
  handleTextChangeFunc,
  ReusableInput,
  ConfigType,
  SignupDataType,
  PostType,
} from './Common';
import axios from 'axios';
import qs from 'query-string';
import NotificationContext from '../../contexts/NotificationContext';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NestedText from '../Common/NestedText';
import WrappedScrollView from '../../reusables/components/Containers/WrappedScrollView';

interface Props {
  stateSignup: [
    SignupDataType,
    React.Dispatch<React.SetStateAction<SignupDataType>>
  ];
}

interface InputFields {
  fName: ConfigType;
  lName: ConfigType;
  email: ConfigType;
  regId: ConfigType;
  password: ConfigType;
  confPassword: ConfigType;
}

const Page1: React.FC<Props> = ({ stateSignup }) => {
  const [signupData] = stateSignup;
  const [loading, setLoading] = useState(false);

  const fieldsData = useState<InputFields>({
    fName: getInputConfig(signupData.fName),
    lName: getInputConfig(signupData.lName),
    email: getInputConfig(signupData.email),
    regId: getInputConfig(signupData.regId),
    password: getInputConfig(signupData.password),
    confPassword: getInputConfig(signupData.confPassword),
  });

  const { expoToken } = useContext(NotificationContext);
  const navigation = useNavigation();

  const [inputFields] = fieldsData;

  const submitted = useRef(false);

  const handleTextChange = handleTextChangeFunc(submitted, fieldsData, 1);

  const handlePress = handlePressFunc(
    submitted,
    fieldsData,
    async () => {
      setLoading(true);

      // eslint-disable-next-line prettier/prettier
      const fieldsValues = {} as PostType<InputFields>;
      (Object.keys(inputFields) as Array<keyof InputFields>).map((key) => {
      	fieldsValues[key] = inputFields[key].value;
      });

      const postData = {
        ...signupData,
        ...fieldsValues,
        expoToken,
      };

      try {
        const { status } = await axios.post(
          'auth/signup',
          qs.stringify(postData),
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          }
        );

        if (status === 201) {
          setLoading(false);
          Alert.alert('Success', 'Link for activation sent to mail', [
            {
              text: 'Cancel',
              onPress: () => navigation.navigate('LoginScreen'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => navigation.navigate('LoginScreen') },
          ]);
        }
      } catch (err) {
        setLoading(false);
        if (err?.response) {
          const { status } = err?.response;
          if (status === 401 || status === 409) {
            Alert.alert('Error', err.response.data);
          } else {
            // Change this badme
            if (status === 422) {
              Alert.alert('Error', 'Enter valid data');
            } else {
              Alert.alert('Server Error');
            }

          }
        }
      }
    },
    1
  );

  return (
    <WrappedScrollView >
      <TitleBottomText
        back
        title="Sign Up"
        text="Please sign up to continue"
        headStyle={{ marginTop: 28.3 }}
      />
      <Form.Provider value={{ handleTextChange, inputFields }}>
        <RowContainer contStyle={{ marginTop: 46.7 }}>
          <ReusableInput
            keyName="fName"
            placeholder="First Name"
            containerStyle={{ width: '45%' }}
          />
          <ReusableInput
            keyName="lName"
            placeholder="Last Name"
            containerStyle={{ width: '45%' }}
          />
        </RowContainer>

        <ReusableInput keyName="email" placeholder="Email" />
        <ReusableInput keyName="regId" placeholder="College Registration ID" />
        <ReusableInput
          keyName="password"
          placeholder="Password"
          config={{ secureTextEntry: true }}
          secure
        />
        <ReusableInput
          keyName="confPassword"
          placeholder="Verify Password"
          config={{ secureTextEntry: true }}
          containerStyle={{ marginBottom: 28.3 }}
          secure
        />
      </Form.Provider>
      <Button
        title="Sign Up"
        long
        handlePress={handlePress}
        loading={loading}
      />
      <NestedText
        text="Already have an account? "
        textNested="Log in"
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </WrappedScrollView>
  );
};

export default Page1;
