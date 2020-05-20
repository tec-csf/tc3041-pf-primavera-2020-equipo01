const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const redisClient = require('../app')
// ROUTE TO SEARCH USER IN REDIS
router.post('/authenticate', (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  redisClient.hgetall(username, function(err, obj) {
    if (!obj) {
      return res.json({
        success: false,
        msg: 'Username not found'
      });
    } else {
      if (obj.password != password){
        return res.json({
          success: false,
          msg: 'Incorrect Password'
        });
      }

      const user = { 
        username : username,
        password : obj.password
      }
      const token = jwt.sign(user, config.secret, {expiresIn: 604800 });
      return res.json({
        success: true,
        token: 'JWT ' + token,
        user: user
      });
    }
  });
});


// *** ROUTE TO CREATE USER IN REDIS ***
router.post('/register', (req, res, next) => {
  let username = req.body.username;
  let password = req.body.password;

  redisClient.hset(username, "password", password, function(err, user) {
    if (!user) {
      return res.json({
        success: false,
        msg: 'The user was not created in redis'
      });
    } else {
      return res.json({
        success: true,
        msg: 'The user was created in redis'
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
