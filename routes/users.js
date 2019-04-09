var express = require('express');
var router = express.Router();


router.get('/getUser', function (req, res, next) {

});

router.post('/addUser', function(req, res, next) {
res.send('YOUPI');
});

router.delete('/deleteUser', function (req, res, next) {
// TODO: Écrire la route
});

router.put('/updateUser', function (req, res, next) {
// TODO: Écrire la route
});

module.exports = router;
