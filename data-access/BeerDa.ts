var admin = require("firebase-admin");

class BeerDA {

  constructor() {
    /*
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
    */
  }

  addBeer(beer, callback) {
    const database = admin.firestore();
    let data = {
      name: beer.name,
      color: beer.color,
      type: beer.type,
      alcohol: beer.alcohol,
      origin: beer.origin
    };
    database.collection("beer").doc(beer.name).set(data);
    callback(data);
  }

  getBeer(beer, callback) {
    const database = admin.firestore();
    database.collection("beer").where('name', '>=', beer.name).get()
      .then(snapshot => {
        if (snapshot.empty) {
          callback(null);
        }
        let answer = [];
        snapshot.forEach(doc => {
          answer.push(doc.data());
        });
        callback(answer);
      })
      .catch(err => {
        console.log('Error getting documents', err);
      });
  }
}
module.exports = BeerDA;
