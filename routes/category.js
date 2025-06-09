const Ctrl = require("../controller/category");
const app = (module.exports = express.Router());

app.route(env.API_PREFIX + "/addCategory").post(Ctrl.addCategory);
app.route(env.API_PREFIX + "/deleteCategory/:id").delete(Ctrl.deleteCategory);
app.route(env.API_PREFIX + "/getAllCategories").get(Ctrl.getAllCategories);
app.route(env.API_PREFIX + "/updateCategory/:id").put(Ctrl.updateCategory);
