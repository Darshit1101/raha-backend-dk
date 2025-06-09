const Ctrl = require("../controller/product");
const app = (module.exports = express.Router());
const upload = require("../service/multer");

app
  .route(env.API_PREFIX + "/addProduct")
  .post(upload.array("image"), Ctrl.addProduct);

app
  .route(env.API_PREFIX + "/updateProduct/:id")
  .put(upload.array("image"), Ctrl.updateProduct);

app.route(env.API_PREFIX + "/deleteProduct/:id").delete(Ctrl.deleteProduct);
app.route(env.API_PREFIX + "/getAllProducts").get(Ctrl.getAllProducts);
app.route(env.API_PREFIX + "/getProduct/:id").get(Ctrl.getProductById);
