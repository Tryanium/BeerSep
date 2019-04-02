var express = require('express');
var router = express.Router();
var admin = require("firebase-admin");

var serviceAccount = require("../firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://beersep-cf1ad.firebaseio.com"
});

const db = admin.firestore();

/* GET home page. */
router.post('/addBeer', function(req, res, next) {
  var docRef = db.collection('beer').doc('HK');
  var setAda = docRef.set({
    name: 'Heineken',
    pourcentage: "5"
  });
res.send('YOUPI');
});

router.post('/deleteBeer', function (req,res, next) {
// TODO: Écrire la route
});

router.post('/updateBeer', function (req,res, next) {
// TODO: Écrire la route
});

module.exports = router;
