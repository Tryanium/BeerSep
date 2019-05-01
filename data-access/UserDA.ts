var admin = require("firebase-admin");

class UserDA {

    constructor() {
      require('dotenv').config();
      admin.initializeApp({
        credential: admin.credential.cert({
          "private_key": process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
          "client_email": process.env.FIREBASE_CLIENT_EMAIL,
          "project_id": process.env.FIREBASE_PROJECT_ID,
          "private_key_id": process.env.FIREBASE_PRIVATE_KEY_ID
        }),
        databaseURL: "https://beersep-cf1ad.firebaseio.com"
      });
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
    // TODO type le user
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
