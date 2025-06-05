const Ctrl = require('../controller/contact').default;
const app = module.exports = express.Router();

app.route(env.API_PREFIX + '/addContact').post(Ctrl.contactController);