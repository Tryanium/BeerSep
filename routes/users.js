var admin = require("firebase-admin");

var serviceAccount = require("../firebase-adminsdk.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://beersep-cf1ad.firebaseio.com"
});

const db = admin.firestore();

router.get('/getUser', function (req, res, next) {

});

router.post('/addUser', function(req, res, next) {
  var docRef = db.collection('beer').doc('HK');
  var setAda = docRef.set({
    name: 'Heineken',
    pourcentage: "5"
  });
res.send('YOUPI');
});

router.delete('/deleteUser', function (req, res, next) {
// TODO: Écrire la route
});

router.put('/updateUser', function (req, res, next) {
// TODO: Écrire la route
});

module.exports = router;
