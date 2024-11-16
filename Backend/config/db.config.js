const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbInstance = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);

dbInstance
  .authenticate()
  .then(() => console.log('Connected to MySQL via Sequelize!'))
  .catch((err) => console.error('Unable to connect to MySQL:', err));

module.exports = { dbInstance };
