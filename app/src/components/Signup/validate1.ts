export function notNull(value) {
  return value !== null;
}

export const isEmpty = (value) => value === '';

export const validate1 = (field, value, fields, forcedTyped) => {
  const newFields = { ...fields };
  let newField;
  let result;
  let result1;
  let result2;

  switch (field) {
    case 'fName':
      result = /^[A-Z]/i.test(value);
      newField = {
        value,
        typed: forcedTyped || false,
        err: {
          err: !result,
          value: result ? '' : 'Enter valid first name',
        },
      };
      break;

    case 'lName':
      result = /^[A-Z]/i.test(value);
      newField = {
        value,
        typed: forcedTyped || false,
        err: {
          err: !result,
          value: result ? '' : 'Enter valid last name',
        },
      };
      break;

    case 'email':
      result = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value);

      newField = {
        value,
        typed: forcedTyped || false,
        err: {
          err: !result,
          value: !result ? 'Enter valid email address' : '',
        },
      };
      break;

    case 'regId':
      result = /^[a-z0-9]+$/i.test(value);
      newField = {
        value,
        typed: forcedTyped || false,
        err: {
          err: !result,
          value: result ? '' : 'Enter valid College Id',
        },
      };
      break;

    case 'password': {
      // Password
      result1 = !isEmpty(value) && value.length >= 8;
      newField = {
        value,
        typed: forcedTyped || false,
        err: {
          err: !result1,
          value: result1 ? '' : 'Min 8 characters required',
        },
      };
      newFields.password = newField;

      // Confirm Password
      result2 = value === newFields.confPassword.value;
      newField = {
        value: newFields.confPassword.value,
        typed: forcedTyped || false,
        err: {
          err: !result2,
          value: !result2 ? 'Passwords dont match' : 'Passwords match',
        },
      };
      newFields.confPassword = newField;

      return newFields;
    }

    case 'confPassword': {
      // Confirm Password
      result1 =
        fields.password.value === value && !isEmpty(fields.password.value);
      newField = {
        value,
        typed: forcedTyped || false,
        err: {
          err: !result1,
          value: !result1 ? 'Passwords dont match' : 'Passwords match',
        },
      };
      newFields.confPassword = newField;

      return newFields;
    }

    case 'all': {
      // Validate all

      //first name
      result = /^[A-Z]/i.test(newFields.fName.value);
      newField = {
        value: newFields.fName.value,
        typed: forcedTyped || false,
        err: {
          err: !result,
          value: result ? '' : 'Enter valid first name',
        },
      };
      newFields.fName = newField;

      // last name
      result = /^[A-Z]/i.test(newFields.lName.value);
      newField = {
        value: newFields.lName.value,
        typed: forcedTyped || false,
        err: {
          err: !result,
          value: result ? '' : 'Enter valid last name',
        },
      };
      newFields.lName = newField;

      // Email
      result = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
        newFields.email.value
      );
      newField = {
        value: newFields.email.value,
        typed: forcedTyped || false,
        err: {
          err: !result,
          value: !result ? 'Enter valid email address' : '',
        },
      };
      newFields.email = newField;

      // College Id
      result = /^[a-z0-9]+$/i.test(newFields.regId.value);
      newField = {
        value: newFields.regId.value,
        typed: forcedTyped || false,
        err: {
          err: !result,
          value: result ? '' : 'Enter valid College Id',
        },
      };
      newFields.regId = newField;

      // Password
      result1 =
        !isEmpty(fields.password.value) && fields.password.value.length >= 8;
      newField = {
        value: fields.password.value,
        typed: forcedTyped || false,
        err: {
          err: !result1,
          value: result1 ? '' : 'Min 8 characters required',
        },
      };
      newFields.password = newField;

      // Confirm Password
      result2 =
        newFields.password.value === newFields.confPassword.value &&
        !isEmpty(newFields.password.value);
      newField = {
        value: newFields.confPassword.value,
        typed: forcedTyped || false,
        err: {
          err: !result2,
          value: !result2 ? 'Passwords dont match' : 'Passwords match',
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
