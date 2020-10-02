const mongoose = require('mongoose');
const { Timestamp } = require('mongodb');

const noticeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 1,
    trim: true,
  },
  body: {
    type: String,
  },
  date: {
    type: Date,
  },
  fileLink: {
    type: String,
  },
  teacher: {
      _id : mongoose.Types.ObjectId,
      name : String
  },
  validDate: {
    type: Date,
    required: true,
  },

  // this type(naming) might confuse at the time of aggregate query.(just to remember);
  type: {
    type: String,
    default: 'notice',
    enum: ['notice', 'exam', 'assignment'],
  },

  tags: [{}],

  comments : [
    { 
      // not sure about this field(will be removed in future).
      studentId : {
        type : mongoose.Types.ObjectId,
        required : true
      },
      studentName : {
        type : String,
        required : true
      },
      body : {
        type : String,
      },
      reply : [{}],
      timestamp : {
        type : Date,
        default : Date.now()
      }
    }
  ]
  
});

module.exports = mongoose.model('Notice', noticeSchema);
