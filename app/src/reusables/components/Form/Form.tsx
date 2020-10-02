import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { paddingStyles } from '../../styles/style';
import TitledInput from '../Inputs/TitledInput/TitledInput';
import validateForm from './validateForm';

// Reusable Form
// The form config shoud be in following format =>
/*
  field1: {
    value: '',
    info: { err: true, value: '' },
    typed: false,
    config: {...},
  },
  field2: ...

*/

// Helper function to get initial field config
/*
const getInputConfig = (config) => ({
  value: '',
  info: { err: true, value: '' },
  typed: false,
  config
});
*/

const Form = ({ formConfig }) => {
  const [fields, setFields] = useState(formConfig);

  const handleTextChange = (field, value) => {
    // Validate form should handle the reponsibility of returning new fields
    const newFields = validateForm(field, value, fields);

    setFields(newFields);
  };
  return (
    <View style={[styles.container, paddingStyles.ptb_12]}>
      {Object.keys(fields).map((field) => (
        <TitledInput
          title={field.toUpperCase()}
          key={field}
          config={{
            ...fields[field].config,
            value: fields[field].value,
            onChangeText: (value) => handleTextChange(field, value),
          }}
          info={fields[field].info}
          typed={fields[field].typed}
          mode={1}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    marginTop: 16,
  },
});

export default Form;
