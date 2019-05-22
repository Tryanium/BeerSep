var admin = require("firebase-admin");

class UserDA {

    constructor() {
    }

    getUser(TwitterProfil, callback) {
        const database = admin.firestore();
        database.collection("users").doc(TwitterProfil.userID).get()
          .then(function(doc) {
            if (doc.exists) {
              callback(doc.data());
            } else {
               callback(null);
            }
          }).catch(function(error) {
            console.log("Error getting document:", error);
          });
    }


    /**
     *
     * @param {String} id
     * @param user
     * @returns {any}
     */
    addUser(TwitterProfil, callback){
        const database = admin.firestore();
        let data = {
          ID: TwitterProfil.userID,
          "Display Name": TwitterProfil.userName,
          picture: TwitterProfil.userImg,
          beers: []
        };
        database.collection("users").doc(TwitterProfil.userID).set(data);
        callback(data);
    }

  /**
  @param {JSON} userID
  @param {JSON} CompletedBeer
  JSON with beer and the note
  */

    addBeerToUser(userID, CompletedBeer, callback) {
      const database = admin.firestore();
      var Doc = database.collection('users').doc(userID);
      var arrUnion = Doc.update({
        beers: admin.firestore.FieldValue.arrayUnion(CompletedBeer)
      });
      return callback("success");
    }

    updateBeerToUser(userID, CompletedBeer, callback) {
      const database = admin.firestore();
      database.collection("users").doc(userID).get()
      .then(function (doc) {
        if (doc.exists) {
          let doc = doc.data();
          let ArrayBeers = doc.beers;
          ArrayBeers.forEach(function (beer) {
            if(beer.beer == CompletedBeer.beer) {
              beer.note = CompletedBeer.note;
              doc.beers = ArrayBeers;
              console.log(doc.data());
              return callback('done');
            }
          });
        } else {
          return callback('Not doc found for this user');
        }
      });
    }
}

module.exports = UserDA;
