const router = require('express').Router();
const {
  getNotices,
  addNotices,
  downloadFile,
  deleteNotice,
  commentOnNotice
} = require('../controllers/noticeCtrl');
const { upload } = require('../utility/upload');

router.get('/getnotices', getNotices);
router.post('/addnotices', upload.single('file'), addNotices);
router.get('/downloadfile', downloadFile);
router.post('/delete', deleteNotice);
router.post('/comment', commentOnNotice);

module.exports = router;
