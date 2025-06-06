global.modalForUser = require("./user");
global.modalForContact = require("./contact");
global.modalForProduct = require("./product");
global.modalForCart = require("./cart");
global.modalForWishlist = require("./wishlist");

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