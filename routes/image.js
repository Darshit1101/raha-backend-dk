const upload = require('../service/multer');
const Ctrl = require('../controller/image');

const app = module.exports = express.Router();
app.route(env.API_PREFIX + '/upload').post(upload.array('image'), Ctrl.uploadImage);