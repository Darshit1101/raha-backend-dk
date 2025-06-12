const multer = require('multer');
const fs = require('fs');

// Create uploads folder if not exists
const uploadPath = './uploads';
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });

module.exports = upload;
