const Image = sequelize.define(
  "image",
  {
    imageId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    productId: {
      type: DataTypes.INTEGER,
      references: {
        model: "products",
        key: "productId",
      },
    },
    image_path: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "image",
  }
);

module.exports = Image;
