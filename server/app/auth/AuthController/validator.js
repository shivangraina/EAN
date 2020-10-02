const { body, validationResult } = require('express-validator');

const userValidationRules = () => [
  // fname must be at least 2 chars long
  body('fName').isLength({ min: 2 }).optional(),
  // field kept optional for use in login as well
  body('lName').isLength({ min: 2 }).optional(),
  body('regId').isLength({ min: 2 }).optional(),
  body('password').isLength({ min: 8 }),
  body('email').isEmail(),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  // 422-unprocessable entry for invalid fields
  return res.status(422).json({
    errors: extractedErrors,
  });
};
const TypeCheck = (req, res, next) => {
  // checks if content-type is application/x-www-form-urlencoded
  if (req.get('Content-Type') !== 'application/x-www-form-urlencoded') {
    res.status(415);
    res.send('Unsupported media');
  } else return next();
};
module.exports = {
  userValidationRules,
  validate,
  TypeCheck,
};
