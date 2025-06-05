const Ctrl = require('../controller/product');
const app = module.exports = express.Router();

app.route(env.API_PREFIX + '/addProduct').post(Ctrl.addProduct);
app.route(env.API_PREFIX + '/deleteProduct/:id').delete(Ctrl.deleteProduct);
app.route(env.API_PREFIX + '/getAllProducts').get(Ctrl.getAllProducts);
app.route(env.API_PREFIX + '/getProduct/:id').get(Ctrl.getProductById);
app.route(env.API_PREFIX + '/updateProduct/:id').put(Ctrl.updateProduct);