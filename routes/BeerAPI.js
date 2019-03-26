var express = require('express');
var router = express.Router();
var app = express();
var request = require("request");

let api_url = "https://sandbox-api.brewerydb.com/v2/";
let api_key = "f3a08c9b4ddf554c7aefe0d43eb69fb3";

/* GET home page. */
router.get('/', function(req, res, next) {
  query(function (body) {
    res.send(body);
  });
});

/**
Exemple de query pour trouver l'ensemble des bières qui existe sur le site
**/
function query(callback) {
      var options = {
        method: 'GET',
        url: 'https://sandbox-api.brewerydb.com/v2/beers/?key=f3a08c9b4ddf554c7aefe0d43eb69fb3',
        headers: {
          http_accept: 'application/json'
        }
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
