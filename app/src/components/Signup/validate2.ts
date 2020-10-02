export function notNull(value: any) {
  return value !== null;
}

export const isEmpty = (value: string) => value === '';

export const validate2 = (
  field: string,
  value: string,
  fields: any,
  forcedTyped: boolean
) => {
  const newFields = { ...fields };
  let newField;
  let result1;
  let result2;

  switch (field) {
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
      // Password
      result1 = !isEmpty(fields.password.value);
      newField = {
        value: fields.password.value,
        typed: forcedTyped || false,
        err: {
          err: !result1,
          value: result1 ? '' : 'Enter valid password',
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
};
