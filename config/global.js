// Load environment variables
require("dotenv").config();
global.env = process.env;

// Sequelize setup and DataTypes for models
const { Sequelize, DataTypes } = require("sequelize");

// This creates and stores the MySQL database connection
global.sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);
global.DataTypes = DataTypes;

// Express setup
global.express = require("express");
global.app = express();
// express.json() works for Content-Type: application/json
app.use(express.json()); // for JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(express.static("uploads"));

// CORS setup
const cors = require("cors");
app.use(cors());

//Other Files
global.msgObj = require('../message.json');

// JWT setup
global.jwt = require("jsonwebtoken");

global.generateToken = (user) => {
  return jwt.sign(
    { id: user.userId || null, email: user.email, role: user.role },
    process.env.JWT_SECRET_KEY
  );
};