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
// Strategy for authenticating with a JSON Web Token.
const passport = require('passport');
// REDIS NEEDS
const redis = require('redis');
const configRedis = require('./config/database');

const redisClient = redis.createClient({
  port      : configRedis.port,              
  host      : configRedis.host,     
  password  : configRedis.password
});

redisClient.on('connect', function() {
  console.log('Connected to redis for the Users');
});

module.exports = redisClient


// get all the routes for make the petitions in the backend
const users = require('./routes/users');
// Constants
const PORT = 3000;
const HOST = '0.0.0.0';


// CORS Middleware its for make the routes to create the petitions
app.use(cors());
// Passport strategy for authenticating with a JSON Web Token.
app.use(passport.initialize());
app.use(passport.session());
// Body parser Middleware
app.use(bodyParser.json());

// Body Parser Middleware to grab the data that we send or recive
app.use(bodyParser.json());

app.use('/auth', users);

app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE'); 
  res.setHeader('Access-Control-Allow-Credentials', true); 
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, X-Requested-With');
  next();
})


// Index Route / show as invalid end point
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);