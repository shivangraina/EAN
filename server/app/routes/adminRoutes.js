const router = require('express').Router();
const {
  getAllTeacher,
  updateTeacher,
  deleteTeacher,
  getAllStudents,
  deleteStudent,
  addStudent,
  updateStudent,
  addTeacher,
  xlUpload,
  downloadSample,
} = require('../controllers/adminCtrl');
const { uploadXcel } = require('../utility/upload');

router.post('/addteacher', addTeacher);
router.get('/getallteachers', getAllTeacher);
router.post('/update', updateTeacher);
router.post('/delete', deleteTeacher);
router.post('/upload-data', uploadXcel.single('file'), xlUpload);
router.get('/getAllStudents', getAllStudents);
router.post('/delete-student', deleteStudent);
router.post('/update-student', updateStudent);
router.post('/addstudent', addStudent);
router.get('/download-sample', downloadSample);

module.exports = router;
