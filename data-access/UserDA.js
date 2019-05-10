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
}

module.exports = UserDA;
