import React, { useContext } from 'react';
import TitledInputMessaged from '../../reusables/components/Inputs/TitledInput/TitledInput';
import { BLACK_1 } from '../../reusables/styles/colors';
import ModalAndPicker from '../../reusables/components/General/ModalAndPicker/ModalAndPicker';
import _ from 'lodash';
import { validate1 } from './validate1';
import { validate2 } from './validate2';

export const Form = React.createContext({});

export interface ConfigType {
  value: string;
  err: { err: boolean, value: string };
  typed: boolean;
}
export const getInputConfig = (value = ''): ConfigType => ({
  value,
  err: { err: false, value: '' },
  typed: false,
});

export type RowsType = Array<{ label: string, value: null | string }>;

export type PostType<T> = {
  // eslint-disable-next-line prettier/prettier
  [P in keyof T]: string
}


export const handleTextChangeFunc = (submitted, fieldsData, type) => (
  field,
  value
) => {
  const [inputFields, setinputFields] = fieldsData;

  let newFields;
  const validate = type === 1 ? validate1 : validate2;

  if (submitted.current) {
    newFields = validate(field, value, inputFields, submitted.current);
  } else {
    newFields = { ...inputFields };
    const newField = { ...newFields[field], value };
    newFields[field] = newField;
  }
  setinputFields(newFields);
};

export const handlePressFunc = (
  submitted,
  fieldsData,
  afterSubmit,
  type,
) => () => {
  const [inputFields, setinputFields] = fieldsData;

  submitted.current = true;

  let flag = false;

  const validate = type === 1 ? validate1 : validate2;

  const newFields = validate('all', '', inputFields, true);
  Object.keys(newFields).map((field) => {
    if (newFields[field].err.err) {
      flag = true;
    }
  });
  if (flag) {
    setinputFields(newFields);
  } else {
    afterSubmit();
  }
};

export const ReusableInput = ({
  placeholder,
  keyName,
  secure = false,
  containerStyle = {},
  config = {},
}) => {
  const { inputFields, handleTextChange } = useContext(Form);

  return (
    <TitledInputMessaged
      containerStyle={containerStyle}
      config={{
        placeholder,
        placeholderTextColor: BLACK_1,
        value: inputFields[keyName].value,
        onChangeText: (value) => handleTextChange(keyName, value),
        ...config,
      }}
      secure={secure}
      err={inputFields[keyName].err}
      typed={inputFields[keyName].typed}
    />
  );
};

export const ReusableModal = ({ keyName }) => {
  const { pickerValues, setPickerConfig } = useContext(Form);

  return (
    <ModalAndPicker
      title={_.startCase(keyName)}
      contStyle={{ width: '45%' }}
      pickerLabel={_.startCase(keyName)}
      {...pickerValues[keyName]}
      handlePressModalOption={(idx) =>
        setPickerConfig(keyName, {
          visible: false,
          index: idx,
        })
      }
      handlePressOnPicker={() =>
        setPickerConfig(keyName, {
          visible: true,
        })
      }
      hideModal={() =>
        setPickerConfig(keyName, {
          visible: false,
        })
      }
    />
  );
};

export interface SignupDataType {
  fName: string;
  lName: string;
  email: string;
  regId: string;
  birthDate: string;
  password: string;
  confPassword: string;
}

// export interface SignupDataType {
// 	fName: string;
// 	lName: string;
// 	branch: string;
// 	year: string;
// 	division: string;
// 	batch: string;
// 	phoneNo: string;
// 	email: string;
// 	regId: string;
// 	birthDate: string;
// 	password: string;
// 	confPassword: string;
// }
