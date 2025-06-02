const sequelize = require('../config/db');
const User = require('./user');

sequelize.sync({ alter: true })
  .then(() => console.log('DB Synced'))
  .catch(err => console.error('DB Sync failed:', err));

module.exports = { sequelize, User };
