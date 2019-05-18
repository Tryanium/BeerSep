var express = require('express');
var router = express.Router();

const Da = require("./../data-access/UserDA.js");

var db = new Da();

router.put('/beer', function (req, res) {
  let userID = req.body.userID;
  let CompletedBeer = req.body.CompletedBeer;
  db.addBeerToUser(userID, CompletedBeer, function (response) {
    res.status(200).send(response);
  });
});

module.exports = router;
