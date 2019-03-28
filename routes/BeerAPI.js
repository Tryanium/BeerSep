var express = require('express');
var router = express.Router();
var app = express();
var request = require("request");

let api_url = "https://sandbox-api.brewerydb.com/v2/";
let api_key = "f3a08c9b4ddf554c7aefe0d43eb69fb3";

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log('https://sandbox-api.brewerydb.com/v2/beers?name=' + req.body.input +'/?key=f3a08c9b4ddf554c7aefe0d43eb69fb3');
  query(req.body.input, function (body) {
    res.send(body);
  });
});

/**
Exemple de query pour trouver l'ensemble des bières qui existe sur le site
**/
function query(input, callback) {
      var options = {
        method: 'GET',
        //url: 'https://sandbox-api.brewerydb.com/v2/beers/?name=corona/?key=f3a08c9b4ddf554c7aefe0d43eb69fb3'
        url: 'https://api.punkapi.com/v2/beers?beer_name=' + input
      };
      request(options, function(error, response, body) {
        if (error) {
          return console.error('Failed: %s', error.message);
        } else {
          console.log(body);
          callback(body);
        }
      });
}
module.exports = router;
