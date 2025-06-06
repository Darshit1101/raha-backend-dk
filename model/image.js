const Image = sequelize.define(
  "image",
  {
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
