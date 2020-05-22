const express = require('express');
const router = express.Router();
const Cases = require('../models/cases');

// add case
router.post('/addCSV', (req, res, next) => {
  // create object with post info
  let cases = req.body;
  var promeses = [];
  cases.forEach(c => {
    const newCase = new Cases({
      _id: c._id,
      name: c.name,
      last_name: c.last_name,
      age: c.age,
      gender: c.gender,
      isConfirmed: c.isConfirmed == "ture" ? true: false,
      country: c.country,
      latitude: c.lat,
      longitude: c.lng,
      recentlyVisited: c.recentlyVisited,
      closestFriends: c.closestFriends
    });

    promeses.push(new Promise((resolve) => {
      Cases.getOne(c._id, (err, cas) => {
        if (err) throw err;
        if (cas) {
          resolve({
            success: false,
            msg: "The case with that id already exists: " + c._id
          });
        } else {
        // Add Case
        Cases.addCase(newCase, (err, data) => {
          // if err return the error
          if (err) {
            resolve({
              success: false,
              msg: err
            });
            // Return succes message
          } else {
            resolve({
              success: true,
              msg: data
            });
          }
        });
      }
    })}));
  });
  Promise.all(promeses).then(responses => {
    return res.json(responses);
  })
});




module.exports = router;
