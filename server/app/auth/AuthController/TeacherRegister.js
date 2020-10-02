const bcrypt = require('bcrypt');
const { ObjectId } = require('mongodb');
const { Teacher, TeacherLookup } = require('../../models/teachers');
const { sendEmail } = require('../../utility/sendEmail');

exports.registerTeacher = async (req, res) => {
  const { fName, lName, regId, email, password } = req.body;

  const hashed = bcrypt.hashSync(password, 14);

  const teacher = {
    fName,
    lName,
    regId,
    email,
    password: hashed,
    role: 'teacher',
  };

  try {
    const teacherLookup = await TeacherLookup.findOne({ email }).exec();
    if (!teacherLookup) {
      return res.status(401).json('Enter email associated with pict domain.');
    }

    if (teacherLookup.regId !== regId) {
      return res
        .status(401)
        .json('Enter registration Id associated with email.');
    }

    const foundTeacher = await Teacher.findOne({ email }).exec();
    if (foundTeacher) {
      return res.status(409).json('Email already exist');
    }
    const { branch, joinYear } = teacherLookup;

    const newTeacher = await Teacher.create({
      branch,
      joinYear,
      tags: teacherLookup.tags,
      lookupId: ObjectId(teacherLookup._id),
      ...teacher,
    });

    // send activation email
    // const url = `https://eanbackend.herokuapp.com/activateAccountTeacher?id=${newTeacher._id}`;
    const url = `http://139.59.3.160/api/activateAccountTeacher?id=${newTeacher._id}`;

    const mailOps = {
      from: '"PICTEAN" <devashishdewalkar@gmail.com>',
      to: email,
      subject: url,
      text: 'Activation Email!',
      html: `<b>Please activate your account! </b><br> Click activate to proceed<br /> <a href=${url}>ACTIVATE</a> `,
    };

    sendEmail(mailOps);

    res.status(201).json('Success');
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error...');
  }
};
// https://stackoverflow.com/questions/39489229/pass-variable-to-html-template-in-nodemailer
