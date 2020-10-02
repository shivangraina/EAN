const router = require('express').Router();
const { profileUpload, getImage } = require('../controllers/studentCtrl');
const { uploadProfile } = require('../utility/upload');

router.post('/profileUpload', uploadProfile.single('file'), profileUpload);
router.get('/getImage', getImage);

module.exports = router;
