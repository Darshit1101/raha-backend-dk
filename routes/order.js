const Ctrl = require('../controller/order');
const app = module.exports = express.Router();

app.route(env.API_PREFIX + '/addOrder').post(Ctrl.addOrder);
app.route(env.API_PREFIX + '/getOrderByUserId/:userId').get(Ctrl.getOrderByUserId);
app.route(env.API_PREFIX + '/getAllOrders').get(Ctrl.getAllOrders);
app.route(env.API_PREFIX + '/deleteOrder/:id').delete(Ctrl.deleteOrder);
app.route(env.API_PREFIX + '/updateOrder/:orderId').put(Ctrl.updateOrder);
app.route(env.API_PREFIX + '/getOrderById/:orderId').get(Ctrl.getOrderById);