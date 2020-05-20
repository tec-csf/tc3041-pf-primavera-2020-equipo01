const express = require('express');
const router = express.Router();
const businesses = require('../models/businesses');

// add 
router.post('/add', function(req, res, next) {
  // create object with post info
  let newB = new  businesses({
    _id: req.body._id,
    ywage: req.body.ywage,
    company: req.body.company,
    phone: req.body.phone,
    employeeSince: req.body.employeeSince,
    suppliers: req.body.associates
  });

  // Add 
  businesses.add(newB, (err, data) => {
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
  businesses.getAll((err, data) => {
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
  businesses.getOne(req, (err, data) => {
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
    let updateB = new  businesses({
        _id: req.body._id,
        ywage: req.body.ywage,
        company: req.body.company,
        phone: req.body.phone,
        employeeSince: req.body.employeeSince,
        suppliers: req.body.associates
    });

    businesses.update(updateB, (err, data) => {
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
    businesses.delete(req, (err, data) => {
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

router.get('/lookup', (req, res, next) => {
  
  businesses.wealthy((err, data) => {
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
