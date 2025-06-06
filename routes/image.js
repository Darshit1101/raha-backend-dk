const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { uploadImage } = require('../controller/image');

const router = express.Router();

// Create uploads folder if not exists
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Multer storage setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Upload route
router.post('/api/upload', upload.single('image'), uploadImage);

module.exports = router;
