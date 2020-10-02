const router = require('express').Router();
const { createTags, getAllTags } = require('../controllers/tagsCtrl');

router.get('/getAllTags', getAllTags);
router.get('/createTags', createTags);

module.exports = router;
