const express = require('express');
const router = express.Router();
// const admin = require("firebase-admin");

/* GET home page. */
router.post('/addBeer', function(req, res) {
  res.send({YOUPI: "youpi"});
});

router.delete('/deleteBeer', function(req, res, next) {
  // TODO: Écrire la route
});

router.put('/updateBeer', function(req, res, next) {
  // TODO: Écrire la route
});

module.exports = router;
