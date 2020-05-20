const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const configRedis = require('../config/database');

// REDIS NEEDS
const redis = require('redis');

const redisClient = redis.createClient({
  port      : configRedis.port,              
  host      : configRedis.host,     
  password  : configRedis.password
});

redisClient.on('connect', function() {
  console.log('Connected to redis for the Users');
});

// ROUTE TO SEARCH USER IN REDIS
router.post('/searchUser', (req, res, next) => {
  let username = req.body.username;

  redisClient.hgetall(username, function(err, obj) {
    if (!obj) {
      return res.json({
        success: false,
        msg: 'No existe admin con ese username'
      });
    } else {
      return res.json({
        success: true,
        admin: obj
      });
    }
  });
});


// *** ROUTE TO CREATE USER IN REDIS ***
router.post('/createUser', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  redisClient.hset(username, "password", password, function(err, user) {
    if (!user) {
      return res.json({
        success: false,
        msg: 'No se creo el usuario en redis'
      });
    } else {
      return res.json({
        success: true,
        msg: 'Se creo el usuario exitosamente en redis'
      });
    }
  });
});

router.post('/editPassword', (req, res, next) => {
  let username = req.body.username;
  let newPassword = req.body.newPassword;

  redisClient.hset(username, "password", newPassword, function(err, admin) {
    if (err) {
      console.log('No se pudo editar la contraseña en redis');
    } else {
      console.log('Se edito la contraseña exitosamente en redis');
    }
  });
});




// Router module for make the petitions
module.exports = router;
