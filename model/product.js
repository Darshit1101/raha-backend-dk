const product = sequelize.define(
  "products",
  {
    productId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      // Product name
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      // Product description
      type: DataTypes.TEXT,
      allowNull: false,
    },
    actualPrice: {
      // Actual price of the product
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    discountedPrice: {
      // Discounted price of the product
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
    size: {
      // Size of the product
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    stockQuantity: {
      // Quantity of the product in stock
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    benefits: {
      // Benefits of the product
      type: DataTypes.JSON,
      defaultValue: null,
    },
    ingredients: {
      // Ingredients used in the product
      type: DataTypes.TEXT,
      defaultValue: null,
    },
    howToUse: {
      // Instructions on how to use the product
      type: DataTypes.JSON,
      defaultValue: null,
    },
  },
  {
    tableName: "products",
  }
);

module.exports = product;
