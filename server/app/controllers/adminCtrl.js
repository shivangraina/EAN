const bcrypt = require('bcrypt');
const { ObjectID, ObjectId } = require('mongodb');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const excelToJson = require('convert-excel-to-json');
const { Teacher, TeacherLookup } = require('../models/teachers');
const { StudentLookup, Student } = require('../models/students');
const { createTag } = require('../auth/AuthController/StudentRegister');

exports.getAllTeacher = (req, res) => {
  const adminId = ObjectID(req.user.teacherId);

  try {
    TeacherLookup.find({ adminId: ObjectID(adminId) }).exec((err, doc) => {
      if (err) {
        return new Error('Server Error : ');
      }

      return res.json(doc);
    });
  } catch (error) {
    console.log(error, 'get all teacher error');
    return res.status(500).json(error.message);
  }
};

exports.addTeacher = (req, res) => {
  const adminId = ObjectID(req.user.teacherId);
  const { branch, fName, lName, regId, email, joinYear } = req.body;

  let { tags } = req.body;

  if (typeof tags === 'string') {
    tags = JSON.parse(tags);
  }

  const teacher = {
    branch,
    fName,
    lName,
    joinYear,
    regId,
    email,
    tags,
    adminId,
    role: 'teacher',
  };

  TeacherLookup.create(teacher)
    .then((doc) => {
      this.getAllTeacher(req, res);
    })
    .catch((error) => {
      console.log(error, 'teacher create error');
      return res.status(500).json(error.message);
    });
};

exports.deleteTeacher = async (req, res) => {
  const { teacherId } = req.body; // Sent from form data
  try {
    await TeacherLookup.remove({ _id: teacherId }).exec();
    await Teacher.remove({ lookupId: ObjectID(teacherId) }).exec();
    this.getAllTeacher(req, res);
  } catch (err) {
    console.log(err);
    return res.status(500).json('Error');
  }
};

exports.updateTeacher = async (req, res) => {
  /** Add condition here that, only that admin can update only that teacher,
   *  who has adminId same as in Auth header */

  let { tags } = req.body;
  const { email } = req.body;

  if (typeof tags === 'string') {
    tags = JSON.parse(tags);
  }

  try {
    await TeacherLookup.findOneAndUpdate(
      { email },
      { ...req.body, tags },
      {
        useFindAndModify: false,
        new: true,
      }
    ).exec();

    await Teacher.findOneAndUpdate(
      { email },
      { ...req.body, tags },
      {
        useFindAndModify: false,
        new: true,
      }
    ).exec();
    this.getAllTeacher(req, res);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
};

exports.xlUpload = (req, res) => {
  let results = [];
  const { type } = req.body;
  const adminId = ObjectID(req.user.teacherId);

  const filePath = path.join(appRoot, 'app', 'public', 'xcelUploads');

  const studentCol = {
    A: 'fName',
    B: 'lName',
    C: 'regId',
    D: 'year',
    E: 'branch',
    F: 'division',
    G: 'batch',
    H: 'birthDate',
  };

  const teacherCol = {
    A: 'fName',
    B: 'lName',
    C: 'regId',
    D: 'email',
    E: 'branch',
    F: 'joinYear',
  };

  try {
    results = excelToJson({
      sourceFile: `${filePath}/${req.file.originalname}`,
      columnToKey: type === 'teacher' ? teacherCol : studentCol,
    });

    if (type === 'teacher') {
      // Validation for Teacher sample vs Student sample
      // Check for validation of data here since no validation added at database level

      // Temp validation
      if (results.Sheet1[0].email !== 'email') {
        return res.status(422).json('Invalid format');
      }
    } else if (results.Sheet1[0].year !== 'year') {
      return res.status(422).json('Invalid format');
    }

    const slicedResults = results.Sheet1.slice(1);

    const mappedResults = slicedResults.map((item) => ({
      ...item,
      adminId: ObjectID(adminId),
    }));

    const Entity = type === 'teacher' ? TeacherLookup : StudentLookup;

    Entity.insertMany(mappedResults)
      .then(() => res.status(200).json('Success'))
      .catch((err) => {
        res.status(422).json('Possibly duplicate or invalid entries');
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json('Server Error');
  }
};

exports.resetPassword = (req, res) => {
  const { password, teacherId } = req.body;

  const hash = bcrypt.hashSync(password, 14);

  Teacher.findOneAndUpdate(
    { _id: ObjectID(teacherId) },
    { password: hash },
    { upsert: true, useFindAndModify: false },
    (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Error');
      }

      return res.status(200).send('Password Reset Success');
    }
  );
};

exports.getAllStudents = (req, res) => {
  const adminId = ObjectID(req.user.teacherId);

  StudentLookup.find({ adminId: ObjectID(adminId) })
    .exec()
    .then((doc) => res.json(doc))
    .catch((err) => {
      console.log(err);
      return res.status(500).json('Err');
    });
};

exports.addStudent = (req, res) => {
  const adminId = ObjectID(req.user.teacherId);
  const {
    year,
    branch,
    division,
    batch,
    regId,
    fName,
    lName,
    birthDate,
  } = req.body;

  const tags = createTag(year, branch, division, batch);

  // Dont use spread operator, here we can know which fields are beig added explicity
  const student = {
    year,
    branch,
    division,
    batch,
    regId,
    fName,
    lName,
    adminId,
    birthDate,
    tags,
  };

  StudentLookup.create(student)
    .then(() => {
      this.getAllStudents(req, res);
    })
    .catch((error) => {
      console.log(error, 'Student create error');
      res.status(500).json(error.message);
    });
};

exports.updateStudent = async (req, res) => {
  /** Add condition here that, only that admin can update only that student,
   *  who has adminId same as in Auth header */

  const tags = createTag(
    req.body.year,
    req.body.branch,
    req.body.division,
    req.body.batch
  );

  const { regId, ...updateValues } = req.body;

  try {
    await StudentLookup.findOneAndUpdate(
      { regId },
      { ...updateValues, tags },
      {
        useFindAndModify: false,
        new: true,
      }
    ).exec();

    await Student.findOneAndUpdate(
      { regId },
      { ...updateValues, tags },
      {
        useFindAndModify: false,
        new: true,
      }
    ).exec();
    this.getAllStudents(req, res);
  } catch (err) {
    console.log(err);
    res.json(500).send(err);
  }
};

exports.deleteStudent = async (req, res) => {
  const { studentId } = req.body; // Sent from form data
  console.log(studentId, 'ljj');
  try {
    await StudentLookup.remove({ _id: ObjectID(studentId) }).exec();
    await Student.remove({ lookupId: ObjectID(studentId) }).exec();
    this.getAllStudents(req, res);
  } catch (err) {
    console.log(err);
    return res.status(500).json('Error');
  }
};

exports.downloadSample = (req, res) => {
  const filePath = path.join(appRoot, 'app', 'public', 'sampleData');
  const { type } = req.query;

  const fileName = type === 'teacher' ? 'TeacherSample' : 'StudentSample';

  res.setHeader('Content-disposition', 'attachment; filename=data.xlsx');
  res.setHeader(
    'Content-type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );

  try {
    const downloadPath = `${filePath}/${fileName}.xlsx`;
    res.download(downloadPath);
  } catch (error) {
    console.log(error, 'download sample error');
    res.status(500).json(error.message);
  }
};

// CSV support present (but not from frontend)
exports.csvUpload = (req, res) => {
  const results = [];
  const filePath = path.join(appRoot, 'app', 'public', 'uploads');

  const { type } = req.body;
  fs.createReadStream(`${filePath}/${req.file.originalname}`)
    .pipe(csv())
    .on('data', (data) => {
      const additional =
        type === 'teacher' ? { adminId: req.user.teacherId, tags: [] } : {};

      return results.push({ ...data, ...additional, password: '12345678' });
    })
    .on('end', () => {
      const Entity = type === 'teacher' ? Teacher : Student;
      Entity.insertMany(results)
        .then(() => {
          fs.unlink(`${filePath}/${req.file.originalname}`, (err) => {
            if (err) throw err;
            return res.status(200).json('Success');
          });
        })
        .catch((err) => res.status(500).json(err));
    });
};

// activate account through email
exports.activateAccount = async (req, res) => {
  const { id } = req.query;

  if (!id) return res.status(400).json('Bad Request!');

  try {
    const foundTeacher = await Teacher.findById(ObjectId(id));
    if (foundTeacher.isActivated) {
      return res.status(200).send('Already Activated!');
    }

    await Teacher.updateOne(
      { _id: ObjectId(id) },
      { isActivated: true }
    ).exec();

    await TeacherLookup.updateOne(
      { _id: ObjectID(foundTeacher.lookupId) },
      { isActivated: true }
    ).exec();

    res.status(200).send('Activation Successful!');
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error!');
  }
};

exports.activateAccountStudent = async (req, res) => {
  const { id } = req.query;

  if (!id) return res.status(400).json('Bad Request!');

  try {
    const foundStudent = await Student.findById(ObjectId(id));
    if (foundStudent.isActivated) {
      return res.status(200).send('Already Activated!');
    }

    await Student.updateOne(
      { _id: ObjectId(id) },
      { isActivated: true }
    ).exec();

    await StudentLookup.updateOne(
      { _id: ObjectID(foundStudent.lookupId) },
      { isActivated: true }
    ).exec();

    res.status(200).send('Activation Successful!');
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal Server Error!');
  }
};
