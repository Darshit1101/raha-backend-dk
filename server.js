require('./config/global'); // Load all globals (sequelize, app, env, etc.)
require('./model/index');  
// require('./config/route');
const userRoutes = require('./routes/user'); // Import user routes

// Register API routes
app.use('/api', userRoutes);

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
