const Ctrl = require("../controller/CustomerReview");
const { checkAuth } = require("../config/middleware");
const app = (module.exports = express.Router());

app.route(env.API_PREFIX + "/addReview").post(checkAuth, Ctrl.addReview);
app.route(env.API_PREFIX + "/getReview").get(checkAuth, Ctrl.getReview);
app
  .route(env.API_PREFIX + "/deleteReview/:id")
  .delete(checkAuth, Ctrl.deleteReview);
