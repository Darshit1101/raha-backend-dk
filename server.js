const express = require('express');
const sequelize = require('./config/db'); // Import database connection
const userRoutes = require('./routes/user'); // Import user routes
require('./global/global'); // Load global variables or functions

const app = express();

// Parse incoming JSON requests
app.use(express.json());

// Register API routes
app.use('/api', userRoutes);

const PORT = process.env.PORT || 5000;

// Start the server and connect to the database
const startServer = async () => {
  try {
    // Check database connection
    await sequelize.authenticate();

    // Sync database models
    await sequelize.sync({ alter: true });

    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Startup error:', err.message);
  }
};

startServer();
