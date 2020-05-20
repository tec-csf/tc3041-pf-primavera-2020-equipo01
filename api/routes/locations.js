const express = require('express');
const router = express.Router();
const Locations = require('../models/locations');

// add 
router.post('/add', function(req, res, next) {
  // create object with post info
  let newL = new  Locations({
    _id: req.body._id,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country,
  });

  // Add 
  Locations.add(newL, (err, data) => {
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
        msg: 'El objeto fue agregado',
        data: data
      });
    }
  });
});

// Get all 
router.get('/getAll', (req, res, next) => {
  Locations.getAll((err, data) => {
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

// Get One
router.get('/get/:id', (req, res, next) => {
  Locations.getOne(req, (err, data) => {
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
    let updateB = new  Locations({
        _id: req.body._id,
        city: req.body.city,
        state: req.body.state,
        country: req.body.country,
    });

    Locations.update(updateB, (err, data) => {
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
    Locations.delete(req, (err, data) => {
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
