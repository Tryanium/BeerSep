const express = require('express');
const router = express.Router();
var admin = require("firebase-admin");
// const admin = require("firebase-admin");

/* GET home page. */
router.post('/addBeer', function(req, res) {
  BeerDA.addBeer(req);
  res.send("Beer added");

});

router.delete('/deleteBeer', function(req, res, next) {
  BeerDA.deleteBeer(req);
  res.send("Beer deleted");
});

router.put('/updateBeer', function(req, res, next) {
  BeerDA.addBeer(req);
  res.send("Beer updated");
});

module.exports = router;
