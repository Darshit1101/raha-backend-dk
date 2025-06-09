const Category = sequelize.define(
  "category",
  {
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: { name: "unique_category", msg: "category must be unique" },
    },
  },
  { tableName: "category" }
);

module.exports = Category;
