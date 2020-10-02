const router = require('express').Router();
const { SignUp } = require('../AuthController/StudentRegister');
const {
  LogIn,
  forgotPasswordOtp,
  sendOtp,
  resetPasswordOtp,
} = require('../AuthController/Login');
const {
  userValidationRules,
  validate,
  TypeCheck,
} = require('../AuthController/validator');
const { registerTeacher } = require('../AuthController/TeacherRegister');

router.post('/signup', TypeCheck, userValidationRules(), validate, SignUp);
router.post('/login', TypeCheck, userValidationRules(), validate, LogIn);
router.post('/signupTeacher', registerTeacher);
router.post('/reset-password-link', forgotPasswordOtp);
router.post('/reset-password-otp', sendOtp);
router.post('/reset-password', resetPasswordOtp);

module.exports = router;
