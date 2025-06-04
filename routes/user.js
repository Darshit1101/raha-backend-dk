const Ctrl = require('../controller/user');
const app = module.exports = express.Router();

app.route(env.API_PREFIX + '/register').post(Ctrl.registerUser);
app.route(env.API_PREFIX + '/login').post(Ctrl.loginUser);
