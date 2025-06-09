global.modalForUser = require("./user");
global.modalForContact = require("./contact");
global.modalForProduct = require("./product");
global.modalForCart = require("./cart");
global.modalForWishlist = require("./wishlist");
global.modalForOrder = require("./order");
global.modalForOrderItem = require("./orderItem");
global.modalForImage = require("./image");

//cart model associations
modalForCart.belongsTo(modalForProduct, {
  foreignKey: "productId", //modalForCart
  as: "product",
  onDelete: "CASCADE",
});

//wishlist model associations
modalForWishlist.belongsTo(modalForProduct, {
  foreignKey: "productId", //modalForWishlist
  as: "product",
  onDelete: "CASCADE",
});

//order model associations
modalForOrder.hasMany(modalForOrderItem, {
  foreignKey: "orderId",
  onDelete: "CASCADE",
});
modalForOrderItem.belongsTo(modalForOrder, { foreignKey: "orderId" });

//image model associations
modalForImage.belongsTo(modalForProduct, {
  foreignKey: "productId",
  as: "product",
  onDelete: "CASCADE",
});
