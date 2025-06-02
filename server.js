const express = require('express');
const { sequelize } = require('./model');
const userRoutes = require('./routes/user');

require('./global/global');// Global variables and functions

const app = express();
app.use(express.json());

app.use('/api', userRoutes);

const PORT = 5000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to MySQL');
    console.log(`listening on ${PORT}...`);
  } catch (err) {
    console.error('Connection failed:', err);
  }
});
