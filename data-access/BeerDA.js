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
    if(beer == "true") {
      console.log("it's working");
      database.collection("beer").get()
        .then(snapshot => {
          if (snapshot.empty) {
            return callback(null);
          }
          let answer = [];
          snapshot.forEach(doc => {
              answer.push(doc.data());
          });
          return callback(answer);
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
    }
    else {
      database.collection("beer").where('name', '>=', beer).get()
        .then(snapshot => {
          if (snapshot.empty) {
            return callback(null);
          }
          let answer = [];
          snapshot.forEach(doc => {
            if(doc.data().name.includes(beer)) {
              answer.push(doc.data());
            }
          });
          return callback(answer);
        })
        .catch(err => {
          console.log('Error getting documents', err);
        });
    }
  }
}
module.exports = BeerDA;
