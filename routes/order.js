const Ctrl = require('../controller/order');
const app = module.exports = express.Router();

app.route(env.API_PREFIX + '/addOrder').post(Ctrl.addOrder);