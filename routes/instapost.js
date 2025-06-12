const upload = require('../service/multer');
const Ctrl = require('../controller/instapost');

const app = (module.exports = express.Router());
app.route(env.API_PREFIX + '/uploadPost').post(upload.single('image'), Ctrl.uploadPost);
app.route(env.API_PREFIX + '/getAllPosts').get(Ctrl.getAllPosts);
app.route(env.API_PREFIX + '/deletepost/:id').delete(Ctrl.deletepost);
app.route(env.API_PREFIX + '/updatePost/:id').put(upload.single('image'), Ctrl.updateUploadPost);
