var express = require('express');
var router = express.Router();

const Da = require("./../data-access/UserDA.js");

var db = new Da();

router.post('/', function(req, res) {
  let user = req.body;
  if (user) {
    let id = user.userID;
    let img = user.userImg;
    let data = checkIfIndB(user, function (data) {
      res.status(200).send(data);
    });
  } else {
    res.status(422).send("Pas le bon format d'envoie des données --> Body vide");
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
