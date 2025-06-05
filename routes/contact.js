const Ctrl = require('../controller/contact');
const app = module.exports = express.Router();

app.route(env.API_PREFIX + '/addContact').post(Ctrl.addContact);
app.route(env.API_PREFIX + '/getAllContact').get(Ctrl.getAllContacts);
app.route(env.API_PREFIX + '/deleteContact/:id').delete(Ctrl.deleteContact);