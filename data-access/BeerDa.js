const admin = require("firebase-admin");

class BeerDA {

  constructor() {
      this.fields = ["name", "origin", "alcohol", "type", "color"];
      this.operators = ["==", ">", ">=", "<", "<="];
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

  getBeer2(beerSearch, callback) {
      const database = admin.firestore();

      const searchFilters = Object.keys(beerSearch);
      if (searchFilters.length === 0) {
          database.collection("beers").get()
              .then(snapshot => callback(snapshot))
              .catch(err => console.log('Error getting document', err));
      }

      this.database.collection("beers").where(searchFilters[0], operator, beerSearch[searchFilters[0]]).get()
          .then(snapshot => {
              if (snapshot.empty) callback(null);

              let answers = [];

              if (searchFilters.length - 1 === 0) answers = snapshot;
              else snapshot.forEach(doc => {
                let correspondingFilters = 1;

                for (let i = 1 ; i < searchFilters.length ; ++i) {
                    if (doc[searchFilters[i]] === beerSearch[searchFilters[i]]) {
                        correspondingFilters++;
                    }
                }

                if (correspondingFilters === searchFilters.length) answers.push(doc);
              });
              callback(answers);
      });
  }

    getBeer3(beerSearch, callback) {
      const database = admin.firestore();
      const beerQuery = database.collection("beer");

      if (beerSearch.name) this.beerQuery = this.beerQuery.where(this.fields[0], this.operators[2],beerSearch.name);
      if (beerSearch.origin) this.beerQuery = this.beerQuery.where(this.fields[1], this.operators[2],beerSearch.origin);
      if (beerSearch.alcohol) this.beerQuery = this.beerQuery.where(this.fields[2], this.operators[2],beerSearch.alcohol);
      if (beerSearch.type) this.beerQuery = this.beerQuery.where(this.fields[3], this.operators[1],beerSearch.type);
      if (beerSearch.color) this.beerQuery = this.beerQuery.where(this.fields[4], this.operators[1],beerSearch.color);

      this.beerQuery.get().then(snapshot => {
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
