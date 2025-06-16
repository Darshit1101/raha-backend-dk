require('./config/global'); // Load all globals (sequelize, app, env, etc.)
require('./model/index'); // Load models
require('./config/route'); // Load routes
require('./config/testing'); // Load testing

const PORT = process.env.PORT || 5000;

// Start the server and connect to the database
const startServer = async () => {
  try {
    await sequelize.authenticate(); // Check DB connection
    await sequelize.sync({ alter: true }); // Sync models

    app.listen(PORT, () => {
      console.log(`listening on ${PORT}...`);
    });
  } catch (err) {
    console.error('Startup error:', err.message);
  }
};

startServer();