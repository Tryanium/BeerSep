var express = require('express');
var router = express.Router();

const Da = require("./../data-access/BeerDA.js");

var db = new Da();

const models = require("../models");

router.post('/add', function(req, res) {
  let beer = req.body;
  if (beer) {
    if(beer.hasOwnProperty('name') && beer.hasOwnProperty('color') && beer.hasOwnProperty('alcohol') && beer.hasOwnProperty('type') && beer.hasOwnProperty('origin')) {
      let name = beer.name;
      let color = beer.color;
      let alcohol = beer.alcohol;
      let type = beer.type;
      let origin = beer.origin;
      let data = checkIfIndB(beer, function (data) {
        res.send(data);
      });
    }
  } else {
    res.send("Pas le bon format d'envoie des données --> Body vide");
  }
});

router.get('/get', function (req, res) {
  let beer = req.query.name;
  if (beer) {
    checkIfIndBGet(beer, function (data) {
      res.send(data);
    });
  }
  else {
    res.send("you need to add the name parameter");
  }
});

router.get('/get2', function (req, res) {
  if (req.body) {
    let beerSearch = new BeerSearch(req.body);
    test2(beerSearch, function (data) {
      res.send(data);
    });
  }
});
function test2 (beer, callback) {
  var beer = db.getBeer2(beer, function (data) {
    if(data === null) {
      callback("The beer does not exist")
    }
    else {
      callback(data);
    }
  });
}

function checkIfIndB(beer, callback) {
   var test = db.getBeer(beer, function (data) {
     if(data === null) {
       db.addBeer(beer, function (data) {
         return callback(data)
       });
     }
     else {
       return callback("This beer is already in the db");
     }
   });
}

function checkIfIndBGet(beer, callback) {
  var beer = db.getBeer(beer, function (data) {
    if(data === null) {
      return callback("The beer does not exist")
    }
    else {
      return callback(data);
    }
  });
}

module.exports = router;
