const Ctrl = require('../controller/cart');
const app = module.exports = express.Router();

app.route(env.API_PREFIX + '/addToCart').post(Ctrl.addToCart);
app.route(env.API_PREFIX + '/getCart/:userId').get(Ctrl.getCart);
app.route(env.API_PREFIX + '/deleteCartItem/:id').delete(Ctrl.deleteCartItem);
app.route(env.API_PREFIX + '/updateCartItem/:id').put(Ctrl.updateCartItem);