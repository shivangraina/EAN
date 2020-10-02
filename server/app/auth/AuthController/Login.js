require('dotenv').config();
const bcrypt = require('bcrypt');
const moment = require('moment');
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const { Student } = require('../../models/students');
const { Teacher } = require('../../models/teachers');
const { sendEmail } = require('../../utility/sendEmail');

const createPayloadStudent = (data) => ({
  tags: data.tags,
  branch: data.branch,
  year: data.year,
  batch: data.batch,
  division: data.division,
  fName: data.fName,
  lName: data.lName,
  regId: data.regId,
  email: data.email,
  birthDate: data.birthDate,
  phoneNo: data.phoneNo,
});
const createPayloadTeacher = (data) => ({
  teacherId: data._id,
  tags: data.tags,
  branch: data.branch,
  fName: data.fName,
  lName: data.lName,
  joinYear: data.joinYear,
  regId: data.regId,
  email: data.email,
  role: data.role,
});

const generateAccessToken = (user) => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '86400s',
  });
};

exports.LogIn = (req, res) => {
  const { email, password, loginType, regId } = req.body;
  // if teacher login
  if (loginType === 'teacher' || loginType === 'admin') {
    Teacher.findOne({ email }, (err, user) => {
      if (err) {
        return res.status(401).json('ERROR');
      }

      if (
        !user ||
        !bcrypt.compareSync(password, user.password) ||
        user.role !== loginType
      ) {
        res.status(401);
        res.send('wrong email or password');
      } else if (!user.isActivated) {
        res.status(401);
        res.send('Activate your account');
      } else {
        // generate accesstoken for the user here

        const accesstoken = generateAccessToken(createPayloadTeacher(user));
        res.status(200);
        // send access token as json in body

        res.json({ access_token: accesstoken });
      }
    });
  } else {
    // if student login
    Student.findOne({ email }, (err, user) => {
      if (err) {
        return res.status(401).json('ERROR');
      }

      if (
        !user ||
        !bcrypt.compareSync(password, user.password) ||
        user.role !== loginType
      ) {
        res.status(403);
        res.send('wrong email or password');
      } else if (!user.isActivated) {
        res.status(401);
        res.send('Activate your account');
      } else {
        // generate accesstoken for the user here

        // jwt token payload(Regid , Tags)
        const accesstoken = generateAccessToken(createPayloadStudent(user));
        res.status(200);
        // send access token as json in body
        res.json({ access_token: accesstoken });
      }
    });
  }
};

exports.forgotPasswordOtp = async (req, res) => {
  const { email, type } = req.body;

  try {
    const otp = otpGenerator.generate(6, {
      upperCase: false,
      alphabets: false,
      specialChars: false,
      digits: true,
    });

    const Entity = type === 'teacher' ? Teacher : Student;

    await Entity.findOneAndUpdate(
      { email },
      {
        $set: {
          'otp.value': otp,
          'otp.expiry': moment().add(10, 'm').format(),
        },
      },
      { useFindAndModify: false },
      (err, user) => {
        if (!user) {
          return res.status(403).json('Email Doesnt exsist');
        }

        const mailOps = {
          from: '"PICTEAN" <devashishdewalkar@gmail.com>',
          to: email,
          subject: 'Forgot Password',
          text: 'Forgot Password',
          html: `<b>Here is the otp :- ${otp}</b>`,
        };

        sendEmail(mailOps);

        return res.status(200).json('Sent Otp');
      }
    ).exec();
  } catch (err) {
    res.status(500).json('Internal Server Error!');
  }
};

exports.sendOtp = async (req, res) => {
  const { email, type, otp } = req.body;

  const Entity = type === 'teacher' ? Teacher : Student;
  try {
    await Entity.findOne({ email }, (err, user) => {
      if (err) {
        return res.status(500).json('Internal Server Error!');
      }

      if (!user) {
        return res.status(403).json('Wrong Email');
      }
      if (user.otp.value === otp && moment().isBefore(user.otp.expiry)) {
        user.otp = {
          value: null,
          expiry: null,
          success: true,
        };
        user.save((error) => {
          if (error) {
            res.status(500).json('DB Error!');
          }
        });
        return res.status(200).json('Correct Otp');
      }
      return res.status(403).json('Incorrect OTP or OTP expired');
    }).exec();
  } catch (err) {
    res.status(500).json('Internal Server Error!');
  }
};

exports.resetPasswordOtp = async (req, res) => {
  const { password, email, type } = req.body;

  const hash = bcrypt.hashSync(password, 14);

  const Entity = type === 'teacher' ? Teacher : Student;

  let flag = false;
  try {
    await Entity.findOne({ email }, (err, user) => {
      try {
        if (err) {
          return res.status(500).send('Error');
        }

        if (!user) {
          return res.status(403).json('Wrong Email While Password Update');
        }
        if (user.otp.success) {
          user.password = hash;

          flag = true;
        }

        user.otp = {
          value: null,
          expiry: null,
          success: null,
        };

        user.save((error) => {
          if (error) {
            console.log(error);
          }
        });

        if (flag) {
          return res.status(200).send('Password Reset Success');
        }
        return res.status(403).json('Some Error Occured');
      } catch (error) {
        res.status(500).json('Some Error Occured');
      }
    }).exec();
  } catch (err) {
    res.status(500).json('Some Error Occured');
  }
};
