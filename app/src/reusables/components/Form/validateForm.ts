import { isEmpty } from '../../Utils/GeneralFunctions';

// Some general form validations
// Can manually alter, but config stucture should remain same
const validateForm = (field, value, fields, forcedTyped) => {
  const newFields = { ...fields };
  let newField;
  let result;
  switch (field) {
    case 'name':
      result = /^[A-Z]/i.test(value);
      newField = {
        ...newFields[field],
        value,
        typed: forcedTyped || false,
        info: {
          err: !result,
          value: result ? '' : 'Invalid Name Not Allowed',
        },
      };
      break;

    case 'password':
      result = isEmpty(value);

      newField = {
        ...newFields[field],
        value,
        typed: forcedTyped || false,
        info: {
          err: result,
          value: result ? 'Empty Password Not Allowed' : '',
        },
      };

      if (
        newFields.confPassword.value &&
        newFields.confPassword.value !== value
      ) {
        newFields.confPassword.info = {
          err: true,
          value: 'Passwords dont match',
        };
      }
      break;

    case 'username': {
      result = /^[A-Z]/i.test(value);
      // Check if username exsist
      // const response = await axiosPost('username_exist/', {
      //   username: value,
      // });

      // Fake response
      const response = {
        data: {
          result: false,
        },
      };

      newField = {
        ...newFields[field],
        value,
        typed: forcedTyped || false,
        info: {
          err: !result || response.data.result,
          value: result
            ? !response.data.result
              ? ''
              : 'Username Exist'
            : 'Invalid Username Not Allowed',
        },
      };
      break;
    }
    case 'confPassword':
      result =
        value === newFields.password.value &&
        !isEmpty(newFields.password.value);
      newField = {
        ...newFields[field],
        value,
        typed: forcedTyped || false,
        info: {
          err: !result,
          value: result ? 'Passwords Match' : 'Passwords Dont Match',
        },
      };

      break;

    case 'all': {
      // Validate all
      result = /^[A-Z]/i.test(newFields.name.value);
      newField = {
        ...newFields[field],
        value: newFields.name.value,
        typed: forcedTyped || false,
        info: {
          err: !result,
          value: result ? '' : 'Invalid Name Not Allowed',
        },
      };

      newFields.name = newField;

      result = isEmpty(newFields.password.value);

      newField = {
        ...newFields[field],
        value: newFields.password.value,
        typed: forcedTyped || false,
        info: {
          err: result,
          value: result ? 'Empty Password Not Allowed' : '',
        },
      };

      if (
        newFields.confPassword.value &&
        newFields.confPassword.value !== newFields.password.value
      ) {
        newFields.confPassword.info = {
          err: true,
          value: 'Passwords dont match',
        };
      }

      newFields.password = newField;

      result = /^[A-Z]/i.test(newFields.username.value);
      // Check if username exsist
      // const response = await axiosPost('username_exist/', {
      //   username: value,
      // });

      // Fake response
      const data = {
        result: false,
      };

      newField = {
        ...newFields[field],
        value,
        typed: forcedTyped || false,
        info: {
          err: !result || data.result,
          value: result
            ? !data.result
              ? ''
              : 'Username Exist'
            : 'Invalid Username Not Allowed',
        },
      };

      newFields.username = newField;

      result =
        newFields.confPassword.value === newFields.password.value &&
        !isEmpty(newFields.password.value);
      newField = {
        ...newFields[field],
        value,
        typed: forcedTyped || false,
        info: {
          err: !result,
          value: result ? 'Passwords Match' : 'Passwords Dont Match',
        },
      };

      newFields.confPassword = newField;

      return newFields;
    }

    default:
      return newFields;
  }

  newFields[field] = newField;

  return newFields;
};

export default validateForm;
