const bcrypt = require('bcrypt');
const { getVerboseName, branches } = require('../../controllers/tagsCtrl');
const { StudentLookup, Student } = require('../../models/students');
const { sendEmail } = require('../../utility/sendEmail');

const createTag = (year, branch, division, batch) => {
  // create 4 role-tags for students
  const tag1 = `${year}_${branch}_${division}_${batch}`; // Batch
  const tag2 = `${year}_${branch}_${division}_X`; // Divison
  const tag3 = `${year}_${branch}_X_X`; // Year Branch
  const tag4 = `${year}_X_X_X`; // Year

  return [
    {
      tagName: tag1,
      verboseName: getVerboseName(year, division, batch),
    },
    {
      tagName: tag2,
      verboseName: getVerboseName(year, division, 'X'),
    },
    {
      tagName: tag3,
      verboseName: `${year} ${branches[branch]}`,
    },
    {
      tagName: tag4,
      verboseName: getVerboseName(year, 'X', 'X'),
    },
  ];
};

exports.createTag = createTag;

// This is for Student
exports.SignUp = (req, res) => {
  const { phoneno, email, regId, expoToken, password, fName, lName } = req.body;

  const hash = bcrypt.hashSync(password, 14);

  const user = {
    fName,
    lName,
    phoneno,
    email,
    regId,
    expoToken,
    password: hash,
  };

  StudentLookup.findOne({ regId })
    .exec()
    .then(async (doc) => {
      if (!doc) {
        return res.status(401).json('Enter correct registration Id.');
      }

      if (doc.fName !== fName || doc.lName !== lName) {
        return res
          .status(401)
          .json('Enter registration Id associated with this name.');
      }

      try {
        const student = await Student.findOne({
          $or: [{ regId }, { email }],
        }).exec();

        if (student) {
          return res.status(409).json('RegId or email already exist');
        }

        const { year, branch, division, batch, birthDate } = doc;
        const tags = createTag(year, branch, division, batch);

        const updatedUser = {
          year,
          branch,
          division,
          batch,
          birthDate,
          ...user,
        };

        // Ask about data inconsistences between Lookup table and actual table
        // other than fName, lName

        const newStudent = await Student.create({ tags, ...updatedUser });

        // const url = `https://eanbackend.herokuapp.com/activateAccountStudent?id=${newStudent._id}`;
        const url = `http://139.59.3.160/api/activateAccountStudent?id=${newStudent._id}`;

        const mailOps = {
          from: '"PICTEAN" <devashishdewalkar@gmail.com>',
          to: email,
          subject: url,
          text: 'Activation Email!',
          html: `<b>Please activate your account! </b><br> Click activate to proceed<br /> <a href=${url}>ACTIVATE</a> `,
        };

        sendEmail(mailOps);

        return res.status(201).json('Success');
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    })
    .catch((err) => res.status(500).json(err));
};
