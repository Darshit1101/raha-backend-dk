require('./config/global'); // Load all globals (sequelize, app, env, etc.)
require('./model/index'); // Load all models
require('./config/route'); // Load routes

const PORT = process.env.PORT || 5000;

// Start the server and connect to the database
const startServer = async () => {
  try {
    await sequelize.authenticate(); // Check DB connection
    await sequelize.sync({ alter: true }); // Sync models

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error('Startup error:', err.message);
  }
};

startServer();
