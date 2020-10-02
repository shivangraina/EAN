import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import qs from 'query-string';
import React, { useRef, useState, useContext } from 'react';
import { Alert } from 'react-native';
import {
  batchPicker,
  branchPicker,
  divPicker,
  yearPicker,
} from '../../constants/PickerContants';
import Button from '../../reusables/components/Buttons/Button';
import Container from '../../reusables/components/Containers/Container';
import RowContainer from '../../reusables/components/Containers/RowContainer';
import useDidUpdate from '../../reusables/hooks/useDidUpdate';
import { dimensionStyles, marginStyles } from '../../reusables/styles/style';
import NestedText from '../Common/NestedText';
import {
  Form,
  getInputConfig,
  handlePressFunc,
  handleTextChangeFunc,
  ReusableInput,
  ReusableModal,
  SignupDataType,
  RowsType,
  PostType,
  ConfigType,
} from './Common';
import NotificationContext from '../../contexts/NotificationContext';

interface InputFields {
  password:ConfigType,
  confPassword: ConfigType,
}


const Page2 = ({ signupData }: { signupData: SignupDataType }) => {
  const fieldsData = useState({
    password: getInputConfig(signupData.password),
    confPassword: getInputConfig(signupData.confPassword),
  });

  const [inputFields] = fieldsData;

  const submitted = useRef(false);

  const handleTextChange = handleTextChangeFunc(submitted, fieldsData, 2);

  const navigation = useNavigation();

  const {expoToken} = useContext(NotificationContext);

  const getPickerConfig = (rows: RowsType) => ({
    index: 0,
    visible: false,
    rows,
    err: null,
  });

  const [pickerValues, setPickerValues] = useState({
    year: getPickerConfig(yearPicker),
    branch: getPickerConfig(branchPicker),
    division: getPickerConfig(divPicker.FE.Comp),
    batch: getPickerConfig(batchPicker.FE.Comp),
  });

  // eslint-disable-next-line prettier/prettier
  const setPickerConfig = (key: keyof typeof pickerValues, updateOb: ReturnType<typeof getPickerConfig>) => {
    const upDatedPickerValues = { ...pickerValues };
    const upDatedPickerValuesKey = {
      ...upDatedPickerValues[key],
      ...updateOb,
    };

    upDatedPickerValues[key] = upDatedPickerValuesKey;

    setPickerValues(upDatedPickerValues);
  };


  const handlePress = handlePressFunc(
    submitted,
    fieldsData,
    async () => {
      const fieldsValues = {} as PostType<InputFields>;
      (Object.keys(inputFields) as Array<keyof InputFields>).map((key) => {
				fieldsValues[key] = inputFields[key].value;
			});

      const pickerData = {} as PostType<typeof pickerValues>;
      (Object.keys(pickerValues) as Array<keyof typeof pickerValues>).map((key) => {
				pickerData[key] = pickerValues[key].rows[pickerValues[key].index].value as string;
			});

      const postData = {
				...signupData,
				...fieldsValues,
				...pickerData,
				expoToken,
			};

      try {
        const { data } = await axios.post(
          'auth/signup',
          qs.stringify(postData),
          {
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          }
        );

        if (data.student) {
          Alert.alert('Success', 'Registered Successfully', [
            {
              text: 'Cancel',
              onPress: () => navigation.navigate('LoginScreen'),
              style: 'cancel',
            },
            { text: 'OK', onPress: () => navigation.navigate('LoginScreen') },
          ]);
        }
      } catch (err) {
        Alert.alert('Some error occured');
        console.log(err, 'sign up err');
      }
    },
    2,
    pickerValues,
    setPickerValues
  );

  useDidUpdate(() => {
    const upDatedPickerValues = { ...pickerValues };
    const updatedDivision = {
      ...upDatedPickerValues.division,
      rows:
        divPicker[yearPicker[pickerValues.year.index || 1].label][
          branchPicker[pickerValues.branch.index || 1].label
        ],
    };
    const upDatedBatch = {
      ...upDatedPickerValues.batch,
      rows:
        batchPicker[yearPicker[pickerValues.year.index || 1].label][
          branchPicker[pickerValues.branch.index || 1].label
        ],
    };

    upDatedPickerValues.division = updatedDivision;
    upDatedPickerValues.batch = upDatedBatch;

    setPickerValues(upDatedPickerValues);
  }, [pickerValues.year.index, pickerValues.branch.index]);

  return (
    <Container w100>
      <Form.Provider
        value={{ handleTextChange, inputFields, pickerValues, setPickerConfig }}
      >
        <RowContainer contStyle={[dimensionStyles.w_100, marginStyles.mt_16]}>
          <ReusableModal keyName="year" />
          <ReusableModal keyName="branch" />
        </RowContainer>
        <RowContainer contStyle={[dimensionStyles.w_100, marginStyles.mb_8]}>
          <ReusableModal keyName="division" />
          <ReusableModal keyName="batch" />
        </RowContainer>

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
      <Button title="Sign Up" long handlePress={handlePress} />
      <NestedText
        text="Already have an account? "
        textNested="Log in"
        onPress={() => navigation.navigate('LoginScreen')}
      />
    </Container>
  );
};

export default Page2;
