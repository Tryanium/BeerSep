var express = require('express');
var router = express.Router();
var util = require('util');

const Da = require("./../data-access/BeerDA.js");

var db = new Da();

router.post('/add', function(req, res) {
  let beer = JSON.parse(req.body.message);
  console.log(beer);
  if (beer) {
    if(beer.hasOwnProperty('name') && beer.hasOwnProperty('color') && beer.hasOwnProperty('alcohol') && beer.hasOwnProperty('type') && beer.hasOwnProperty('origin')) {
      let check = checkIfIndB(beer, function (data) {
        res.send(data);
      });
    } else {
      res.status(300).send('FORMAT WRONG');
    }
  } else {
    res.send("Pas le bon format d'envoie des données --> Body vide");
  }
});

router.get('/get', function (req, res) {
  let beer = req.query.name;
  if (beer) {
    checkIfIndBGet(beer, function (data) {
      if (data == null) {
        console.log("empty");
      }
      res.send(data);
    });
  }
  else {
    res.send("you need to add the name parameter");
  }
});

function checkIfIndB(beer, callback) {
   var test = db.getBeer(beer.name, function (data) {
     console.log("DATA : ", data);
     console.log(data.length);
     if(data.length <= 0) {
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
      return callback(data);
  });
}

module.exports = router;
