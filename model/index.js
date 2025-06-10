global.modalForUser = require("./user");
global.modalForContact = require("./contact");
global.modalForProduct = require("./product");
global.modalForCart = require("./cart");
global.modalForWishlist = require("./wishlist");
global.modalForOrder = require("./order");
global.modalForOrderItem = require("./orderItem");
global.modalForImage = require("./image");
global.modalForCategory = require("./category");

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

// Product model
modalForProduct.hasMany(modalForImage, { foreignKey: "productId" });

// Image model
modalForImage.belongsTo(modalForProduct, {
  foreignKey: "productId",
  onDelete: "CASCADE",
});

// Product belongs to Category
modalForProduct.belongsTo(modalForCategory, { foreignKey: "categoryId" });
modalForCategory.hasMany(modalForProduct, { foreignKey: "categoryId" });

// OrderItem belongs to Product
modalForOrderItem.belongsTo(modalForProduct, {
  foreignKey: "productId",
});
