const mongoose = require('mongoose');
const moment = require('moment');

const commonSchema = {
  fName: {
    type: String,
    trim: true,
  },
  lName: {
    type: String,
    trim: true,
  },
  branch: {
    type: String,
    trim: true,
  },
  year: {
    type: String,
    trim: true,
  },
  division: {
    type: String,
    trim: true,
  },
  batch: {
    type: String,
    trim: true,
  },
  regId: {
    type: String,
    unique: true,
    trim: true,
  },
  birthDate: {
    type: String,
  },
  phoneNo: {
    type: String,
    maxlength: 10,
  },
  // Add by which admin?
  adminId: {
    type: String,
  },
  isActivated: {
    type: Boolean,
    required: true,
    default: false,
  },
};

const studentSchema = new mongoose.Schema({
  ...commonSchema,
  tags: [{}],
  password: {
    type: String,
    required: true,
    trim: true,
  },
  profileImg: {
    type: String,
  },
  expoToken: {
    type: String,
  },
  // Account activated
  activated: {
    type: Boolean,
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  otp: {},
  lookupId: { type: mongoose.Schema.Types.ObjectId, ref: 'StudentLookUp' },
});

const studentLookupSchema = new mongoose.Schema({
  ...commonSchema, // If added in look up but not registered.
  isRegistered: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Student = mongoose.model('Student', studentSchema);
const StudentLookup = mongoose.model('StudentLookUp', studentLookupSchema);

module.exports = {
  Student,
  StudentLookup,
};
