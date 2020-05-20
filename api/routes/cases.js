const express = require('express');
const router = express.Router();
const Cases = require('../models/cases');

// add case
router.post('/add', function(req, res, next) {
  // create object with post info

  let newCase = new Cases({
    _id: req.body._id,
    name: req.body.name,
    last_name: req.body.last_name,
    age: req.body.age,
    gender: req.body.gender,
    isConfirmed: req.body.isConfirmed,
    country: req.body.country,
    latitude: req.body.latitude,
    longitude: req.body.longitude,
    recentlyVisited: req.body.recentlyVisited,
    closestFriends: req.body.closestFriends
  });
  // Add Case
  Cases.addCase(newCase, (err, data) => {
    // if err return the error
    if (err) {
      res.json({
        success: false,
        msg: err
      });
      // Return succes message
    } else {
      res.json({
        success: true,
        msg: 'El objeto fue agregada generado'
      });
    }
  });
});

// Get One
router.get('/get/:id', (req, res, next) => {
  Cases.getOne(req, (err, data) => {
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    } else {
      res.json({
        success: true,
        data: data
      });
    }
  });
});

// Get all Cases
router.get('/getAll', (req, res, next) => {
  Cases.getAll((err, data) => {
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    } else {
      res.json({
        success: true,
        data: data
      });
    }
  });
});

router.put('/update/:id', (req, res, next) => {
    let updateCase = new Cases({
        _id: req.body._id,
        name: req.body.name,
        last_name: req.body.last_name,
        age: req.body.age,
        gender: req.body.gender,
        isConfirmed: req.body.isConfirmed,
        country: req.body.country,
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        recentlyVisited: req.body.recentlyVisited,
        closestFriends: req.body.closestFriends
    });

    Cases.update(updateCase, (err, data) => {
        if (err) {
            res.json({
            success: false,
            msg: err
            });
        } else {
            res.json({
            success: true,
            data: data
            });
        }
    });
});

router.delete('/delete/:id', (req, res, next) => {
    Cases.delete(req, (err, data) => {
        if (err) {
            res.json({
            success: false,
            msg: err
            });
        } else {
            res.json({
            success: true,
            data: data
            });
        }
    });
});

router.get('/unwind', (req, res, next) => {
  Cases.vulnerable((err, data) => {
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    } else {
      res.json({
        success: true,
        data: data
      });
    }
  });
});

router.get('/graphLookup', (req, res, next) => {
  Cases.distancing((err, data) => {
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    } else {
      res.json({
        success: true,
        data: data
      });
    }
  });
});


router.get('/facet', (req, res, next) => {
  Cases.facet((err, data) => {
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    } else {
      res.json({
        success: true,
        data: data
      });
    }
  });
});

router.get('/geoNear', (req, res, next) => {
  Cases.geoNear((err, data) => {
    if (err) {
      res.json({
        success: false,
        msg: err
      });
    } else {
      res.json({
        success: true,
        data: data
      });
    }
  });
});

module.exports = router;
