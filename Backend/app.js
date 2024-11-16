const express = require('express');
const app = express();
const router = require('./routes/index');
const bodyParser = require("body-parser");
const cors = require("cors");

const { dbInstance } = require('./config/db.config');
const { Employee } = require('./models/employees.model');

// Sync the database and tables
dbInstance.sync()
  .then(() => console.log('Database synced'))
  .catch((err) => console.error('Error syncing database:', err));


  // const corsOptions = {
  //   origin: ['http://localhost:30001', 'https://your-frontend-domain.com'], // List allowed domains
  //   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  //   allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  // };
  
  app.use(cors());
  
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(bodyParser.json());


app.use('/api/v1', router);

module.exports = app;
