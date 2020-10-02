const { ObjectID, ObjectId } = require('mongodb');
const path = require('path');
const Notice = require('../models/notices');

exports.getNotices = (req, res) => {
  const { tags, teacherId } = req.user;

  try {
    if (req.user.role === 'teacher') {
      Notice.find({
        'teacher._id': ObjectId(teacherId),
      }).exec((err, doc) => {
        if (err) {
          return new Error('Server Error');
        }
        return res.json(doc);
      });
    } else {
      Notice.aggregate([
        { $match: { tags: { $in: tags } } },
        { $unwind: '$tags' },
        { $match: { tags: { $in: tags } } },
        { $group: { _id: '$tags.tagName', notices: { $push: '$$ROOT' } } },
      ]).exec((err, doc) => {
        const response = {};
        doc.map((item) => {
          response[item._id] = item.notices;
        });

        if (err) {
          return new Error('Server error...');
        }

        res.json(response);
      });
    }
  } catch (error) {
    console.log(error.message, 'get notice error');
    res.status(500).json('Server Error');
  }
};

exports.addNotices = (req, res) => {
  let { tags } = req.body;
  let { teacher } = req.body;

  if (typeof tags === 'string' || typeof teacher === 'string') {
    tags = JSON.parse(tags);
    teacher = JSON.parse(teacher);
  }

  const notice = {
    title: req.body.title,
    body: req.body.body,
    date: new Date().toISOString().split('T'),
    fileLink: req.file ? `uploads/${req.file.originalname}` : 'null',
    teacher,
    validDate: req.body.validDate,
    type: req.body.type,
    tags,
  };

  Notice.create(notice)
    .then(() => {
      res.status(201).json('Notice Uploaded');
    })
    .catch((error) => {
      console.log(error, 'create notice error');
      res.status(500).json(error.message);
    });
};

exports.deleteNotice = (req, res) => {
  const { noticeId } = req.body;

  Notice.remove({ _id: ObjectID(noticeId) })
    .exec()
    .then(() => {
      this.getNotices(req, res);
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.downloadFile = (req, res) => {
  const filePath = path.join(appRoot, 'app', 'public');

  const noticeId = req.query.id;
  if (!noticeId) return res.json('missing noticeId parameter');

  try {
    Notice.findOne({ _id: ObjectID(noticeId) }).exec((err, doc) => {
      if (err) {
        return new Error('Server Error');
      }
      const downloadPath = `${filePath}/${doc.fileLink}`;
      res.download(downloadPath);
    });
  } catch (error) {
    console.log(error, 'download notice error');
    res.status(500).json(error.message);
  }
};

exports.commentOnNotice = (req, res) => {
  const { noticeId, studentId, studentName, body } = req.body;

  Notice.update(
    { _id: ObjectId(noticeId) },
    { $push: { comments: { studentId, studentName, body } } }
  )
    .exec()
    .then((doc) => {
      res.status(200).json('Commment added!');
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
};
