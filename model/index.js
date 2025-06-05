global.modalForUser = require("./user");
global.modalForContact = require("./contact");
global.modalForProduct = require("./product");
global.modalForCart = require("./cart");

modalForCart.belongsTo(modalForProduct, {
  foreignKey: "productId",
  as: "product",
  onDelete: "CASCADE",
});
