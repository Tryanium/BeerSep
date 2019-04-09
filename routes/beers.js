var express = require('express');
var router = express.Router();
var admin = require("firebase-admin");
//var BeerDA = require('../DataAccess/BeerDa.ts');

/* GET home page. */
router.post('/addBeer', function(req, res, next) {
  //BeerDA.addBeer();
  res.send('YOUPI');
});

router.delete('/deleteBeer', function(req, res, next) {
  // TODO: Écrire la route
});

router.put('/updateBeer', function(req, res, next) {
  // TODO: Écrire la route
});

module.exports = router;
