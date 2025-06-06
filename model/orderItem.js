const OrderItem = sequelize.define(
  "orderitem",
  {
    orderItemId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orderId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      references: {
        model: "order",
        key: "orderId",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      defaultValue: null,
      references: {
        model: "products",
        key: "productId",
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  },
  {
    tableName: "orderitem",
  }
);

module.exports = OrderItem;
