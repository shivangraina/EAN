const mongoose = require('mongoose');

const commonSchema = {
  branch: {
    type: String,
    trim: true,
  },
  fName: {
    type: String,
    trim: true,
  },
  lName: {
    type: String,
    trim: true,
  },
  joinYear: {
    type: String,
    trim: true,
  },
  regId: {
    type: String,
    unique: true,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  // Add by which admin?
  adminId: {
    type: String,
  },
  // Email varification
  isActivated: {
    type: Boolean,
    required: true,
    default: false,
  },
  tags: [{}],
  role: {
    type: String,
    enum: ['admin', 'teacher'],
    default: 'teacher',
  },
};

const teacherSchema = new mongoose.Schema({
  ...commonSchema,
  password: {
    type: String,
    required: true,
    trim: true,
  },
  lookupId: { type: mongoose.Schema.Types.ObjectId, ref: 'TeacherLookup' },
});

const teacherLookupSchema = new mongoose.Schema({
  ...commonSchema,
});

const Teacher = mongoose.model('Teacher', teacherSchema);
const TeacherLookup = mongoose.model('TeacherLookup', teacherLookupSchema);

module.exports = {
  Teacher,
  TeacherLookup,
};
