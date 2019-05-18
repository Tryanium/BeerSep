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
              console.log("No such document!");
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
      var updateNested = database.collection('users').doc(userID).update({
        beers: admin.firestore.FieldValue.delete(CompletedBeer.beer)
      });
      return callback('done');
    }
}

module.exports = UserDA;
