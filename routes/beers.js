const express = require('express');
const router = express();
var admin = require("firebase-admin");

require('dotenv').config();
admin.initializeApp({
    credential: admin.credential.cert({
        "private_key": "-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDKJbC26EndWyYa\\nMAB8vfqnVDwlYzNfD9h5rIC1Drt6GPv3tQUw2lEaJ6fPlV3Ez9DC8YNP7N7XF/DM\\nVn/CC38qjKJJO76ifbEPzsjUx0g+3tF+mc+kqzYAcVLqd4ICOIniFndiNS6D8LQL\\ntIPwMOLu8adeFAAajA3gnv0U1mD550DY951TbvTCUlmJbhJj99QSl6RvWB31MCDx\\nefJPHqObH/TxeFZhs6riTUQ2+8fdnAgTUGsltcYvunL9l2UB2OCsgbbxVEnUPbXx\\nRXlpT6k53zThMD2Go0S1nLmZNNVpPeRRZnpwIECgGmb/bFzX/mvQSY1C5EGUHEaW\\np2Ob53QzAgMBAAECggEAJjV8kv4SJCR77bxAA1QXgjRSUBDRn3jLxqfcBh0cQ6Zg\\nTgBp1EOXy9VOC1cky7QqNgbXdq6Dqm1shvscl+17YmwFqsj/rhAK/T1tSYbHeZa9\\nS2xAStRP10KUVRw0tz2/ljv/4dDCk47WQVYkECz1YAvOQmKOaHYrk1cJ6DvjRajh\\n3ojiCp4Buoq1uP3xVcexTN6Hb5XEtwRsUZduMvE6nqN3UcUzy7ClvDoh0x5TmQRS\\nmGQGmJq3jzayzP2rz/BlRVhi8U3xl+exdxMnfTz8RL5CHU644+fDsN5AuK4yOMdo\\n+KZNmEi5/jlSLVB0m9tHd0aEMZlnlVISiL33DzfXbQKBgQDnls89TEXFg//3MFAW\\nfxy1BcbBcqpeGSJe3UsdimWDvPDmhkcIn32hmLV6cQW9bVieXm70WKxQSdBToXHf\\nPQNBAsrK2uLxAbMZYHz4Fn9u2kx48swxt1v8TETPV0x/UK+TxUiSFC7x176zrz03\\nnQm/HvKJIXF8SN3nKKC+rXWUzQKBgQDfdGwrF47vzuRdAHTjVpHrsZwxQdKpvbaU\\n/uRNtV6rC7g1AfCzUuphLrrY0sKztOLry2obnq/evPWku/78CcBSsqOVTqVyswph\\nu/kBxnNS63iYNWxW5Z19MzXDPc6b8o8LCTkcAG1MSHh1j3iVaMEAwCMaklBJI2ge\\n/z7z7wks/wKBgFl2i8ZNQaLElEwEUNvv7MINYjN2vVOud/WXnR3jScXzZkhXVPeC\\nzUBwwqJzKNl9dT9wkYI5Aw/dA+pasqefZTNnBboJhqO9mVdTS9N2tXG4SNRsTu9h\\nutojCG3kdnu0Sq9WBevQejYYtuWo64ghVROMu/q3faSabYaPzlD6pzJ9AoGBANX4\\nInfk+B8TqsKPZF4okFPz38+e6v1Ux1fG95CdosgA0eQYNodQV1S1rX9f2cbA6CXH\\nw5QtENUldcbHqfNn1vyZSGD5TR4W6VMK7vbPM7Dr/68oQNS4zGSNu+Z38baMvoJf\\n04rHseFA5/AScPIIu/9e/H4+KpjOSa6c1Yg5lTy7AoGBAK9vEC4TBT4v9YCm6qJ/\\ncb3HwQfKOSnccK5yt2cxSbR53F9tnxSUUo8Sl3E/8FcRcLgv29MJ02rwMZiJ8Aet\\nDVft3zRowpOngY4S7JMmIEptxOrfIvRyDjoCNqSWVMgPtdOQRJ736YisnzbX5aXx\\n8Em0Pj845LhhZzfPZDRPqPXL\\n-----END PRIVATE KEY-----\\n".replace(/\\n/g, '\n'),
        "client_email": "firebase-adminsdk-k7kat@beersep-cf1ad.iam.gserviceaccount.com",
        "project_id": "beersep-cf1ad",
        "private_key_id": "e27965c32311ac8556aba3516dfa3bae97c84c24"
    }),
    databaseURL: "https://project-3074082204483641362.firebaseio.com"
    // databaseURL: "https://beersep-cf1ad.firebaseio.com"
});
const database = admin.firestore();
// const admin = require("firebase-admin");
var bodyParser = require('body-parser');

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
/* GET home page. */
router.get('/list_user', function (req, res) {
    database.collection("id").doc(req.body.Id).get()
        .then(function(doc) {
            if (doc.exists) {
                console.log(doc);
                return doc;

            } else {
                console.log("No such document!");
                return null;
            }
        }).catch(function(error) {
        console.log("Error getting document:", error);
    });
    res.send("Beer got");
})

router.get('/test.html', function (req, res) {
    res.sendFile( __dirname + "/" + "test.html" );
})


router.post('/addBeer', urlencodedParser,function(req, res) {
    var response = {
        "name":req.body.Name,
        "id":req.body.Id,
        "alcoholVol":req.body.AlcoholVol,
        "colour": req.body.Colour
    };
    let BeerForm = {
        name: req.body.Name,
        id: req.body.Id,
        alcoholVol: req.body.AlcoholVol,
        colour: req.body.Colour,
    };


    database.collection("id").doc(req.body.Id).set(BeerForm);


    console.log(response);
  res.send("Beer added");
});

router.delete('/deleteBeer', function(req, res) {

    database.collection("id").doc(BeerForm.Id).remove();
    return true;
  res.send("Beer deleted");
});

router.put('/updateBeer', function(req, res, next) {

  res.send("Beer updated");
});

var server = router.listen(8081, function () {

    var host = server.address().address
    var port = server.address().port



})
// var admin = require("firebase-admin");
// const {BeerDa} = require('../data-access/BeerDa');
//
//
//
// BeerDa.getBeer({ Name: "qingdao" }, 0);
// module.exports = router;
