var express = require('express');
var router = express.Router();
var passport = require('passport');

const Da = require("./../data-access/UserDA.ts");

var db = new Da();

router.get('/', function(req, res) {
  let user = req.body;
  if (user) {
    let id = user.userID;
    let img = user.userImg;
    let data = checkIfIndB(user, function (data) {
      console.log(data);
      res.send(data);
    });
  } else {
    res.send("Pas le bon format d'envoie des données --> Body vide");
  }
});

function checkIfIndB(TwitterProfil, callback) {
   var usr = db.getUser(TwitterProfil, function (data) {
     if(data === null) {
       db.addUser(TwitterProfil, function (data) {
         callback(data)
       });
     }
     else {
       callback(data);
     }
   });
}

module.exports = router;
