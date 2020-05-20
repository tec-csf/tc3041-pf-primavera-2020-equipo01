'use strict';

// Make the comunication with a server to create petitions
const express = require('express');
// Make the paths for the paths to create the petitions
const path = require('path');
// Parses the information in the body of petitions
const bodyParser = require('body-parser');
// Cross-Origin Resource Sharing needed for express to get headers
const cors = require('cors');
// Start our server app to make the petitions
const app = express();

// get all the routes for make the petitions in the backend
const users = require('./routes/users');
// Constants
const PORT = 3000;
const HOST = '0.0.0.0';

// CORS Middleware its for make the routes to create the petitions
app.use(cors());

// Body Parser Middleware to grab the data that we send or recive
app.use(bodyParser.json());

app.use('/auth', users);

// Index Route / show as invalid end point
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);