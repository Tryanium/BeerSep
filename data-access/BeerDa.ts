var admin = require("firebase-admin");

class BeerDA {

  constructor() {
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
