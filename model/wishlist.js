const wishlist = sequelize.define(
  "wishlists",
  {
    wishlistId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "userId",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "products",
        key: "productId",
      },
      onDelete: "CASCADE",
    },
  },
  {
    tableName: "wishlists",
  }
);

module.exports = wishlist;
