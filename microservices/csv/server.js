// Make the comunication with a server to create petitions
const express = require('express');
// Make the paths for the paths to create the petitions
const path = require('path');
// Parses the information in the body of petitions
const bodyParser = require('body-parser');
// Cross-Origin Resource Sharing needed for express to get headers
const cors = require('cors');
// MongoDB object modeling tool designed to work in an asynchronous environment.
const mongoose = require('mongoose');
// Configuration of the database
const config = require('./config/database');

// Connect with the database credentials
mongoose.connect(config.database, {
  useNewUrlParser: true
});

mongoose.connection.on('connected', () => {
  console.log('Success' + config.database);
});

mongoose.connection.on('error', (err) => {
  console.log('Error: ' + err);
});

// Init app with express
const app = express();
// CORS for requests
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); 
  res.setHeader('Access-Control-Allow-Credentials', true); 
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, X-Requested-With');
  next();
})

app.set('trust proxy', true);
// create the routes and set the port
const cases = require('./routes/cases');

app.use('/cases', cases);


const port = 3001;
// Start Server on the port setted
app.listen(port, () => {
  console.log('Server started on port ' +  port);
});
