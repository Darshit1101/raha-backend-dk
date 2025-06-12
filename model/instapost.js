const CustomerReview = sequelize.define(
  'instapost',
  {
    InstaPostId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    link: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  { tableName: 'instapost', timestamps: false }
);

module.exports = CustomerReview;
