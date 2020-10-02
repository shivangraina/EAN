const multer = require('multer');

// configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './app/public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const profileImagesStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './app/public/profileImages');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const xcelUpload = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './app/public/xcelUploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// upload variable
const upload = multer({ storage });
const uploadProfile = multer({ storage: profileImagesStorage });
const uploadXcel = multer({ storage: xcelUpload });

module.exports = { upload, uploadProfile, uploadXcel };
