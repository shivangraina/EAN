/* eslint-disable no-param-reassign */
const path = require('path');
const { Student } = require('../models/students');

exports.profileUpload = (req, res) => {
  const { email } = req.user;

  Student.findOneAndUpdate(
    { email },
    { profileImg: `profileImages/${req.file.originalname}` },
    { upsert: true, useFindAndModify: false },
    (err, user) => {
      res.send('Yess');
    }
  );
};

exports.getImage = (req, res) => {
  const filePath = path.join(appRoot, 'app', 'public');

  const { email } = req.user;
  Student.findOne({ email })
    .exec()
    .then((user) => {
      const imgPath = `${filePath}/${user.profileImg}`;
      res.sendFile(imgPath);
    })
    .catch((error) => {
      console.log(error, 'error');
      res.status(500).json(error.message);
    });
};
