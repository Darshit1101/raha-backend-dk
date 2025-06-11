const Ctrl = require("../controller/CustomerReview");
const app = (module.exports = express.Router());

app.route(env.API_PREFIX + "/addReview").post(Ctrl.addReview);
app.route(env.API_PREFIX + "/getReview").get(Ctrl.getReview);
app.route(env.API_PREFIX + "/deleteReview/:id").delete(Ctrl.deleteReview);
