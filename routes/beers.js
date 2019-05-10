var express = require('express');
var router = express.Router();

const Da = require("../data-access/BeerDa.js");

var db = new Da();

router.post('/add', function(req, res) {
  let beer = req.body;
  if (beer) {
    let name = beer.name;
    let color = beer.color;
    let alcohol = beer.alcohol;
    let type = beer.type;
    let origin = beer.origin;
    let data = checkIfIndB(beer, function (data) {
      res.send(data);
    });
  } else {
    res.send("Pas le bon format d'envoie des données --> Body vide");
  }
});

router.get('/get', function (req, res) {
  let beer = req.body;
  if (beer) {
    checkIfIndBGet(beer, function (data) {
      res.send(data);
    });
  }
});

function checkIfIndB(beer, callback) {
   var test = db.getBeer(beer, function (data) {
     if(data === null) {
       db.addBeer(beer, function (data) {
         callback(data)
       });
     }
     else {
       callback("This beer is already in the db");
     }
   });
}

function checkIfIndBGet(beer, callback) {
  var beer = db.getBeer(beer, function (data) {
    if(data === null) {
      callback("The beer does not exist")
    }
    else {
      callback(data);
    }
  });
}

module.exports = router;
