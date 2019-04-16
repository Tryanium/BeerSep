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

    getUser(id) {
        const database = admin.firestore();
        database.collection("users").doc(id).get()
          .then(function(doc) {
            if (doc.exists) {
              console.log(doc.data());
              return doc.data();
            } else {
              console.log("No such document!");
              return null;
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
    addUser(id, user){
        const database = admin.firestore();
        let data = {
          ID: id,
          "Display Name": user
        }
        database.collection("users").doc(id).set(data);
        return true;
    }
}

module.exports = UserDA;
