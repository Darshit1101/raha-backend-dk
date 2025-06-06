const Ctrl = require('../controller/wishlist');
const app = module.exports = express.Router();

app.route(env.API_PREFIX + '/addToWishlist').post(Ctrl.addToWishlist);
app.route(env.API_PREFIX + '/getWishlist/:userId').get(Ctrl.getWishlist);
app.route(env.API_PREFIX + '/deleteWishlistItem/:id').delete(Ctrl.deleteWishlistItem);