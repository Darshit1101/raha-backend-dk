const sequelize = require('../config/database');
const User = require('./user');

sequelize.sync({ force: false  }) // Set true to reset tables
  .then(() => console.log('DB Synced'))
  .catch(err => console.error('DB Sync failed:', err));

module.exports = { sequelize, User };
