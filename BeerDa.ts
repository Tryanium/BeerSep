var admin = require("firebase-admin");
class BeerDA {

    constructor() {
        require('dotenv').config();
        admin.initializeApp({
            credential: admin.credential.cert({
                "id": process.env.FIREBASE_ID,
                "alcoholVol": process.env.FIREBASE_ALCOHOLVOL,
                "colour": process.env.FIREBASE_COLOUR,
                "name": process.env.FIREBASE_NAME
            }),
            databaseURL: "https://beersep-cf1ad.firebaseio.com"
        });
    }
    getBeer(TwitterProfil, callback) {
        const database = admin.firestore();
        database.collection("name").doc(TwitterProfil.Name).get()
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
    addBeer(TwitterProfil){
        const database = admin.firestore();
        let data = {
            name: TwitterProfil.Name,
            id: TwitterProfil.Id,
            alcoholVol: TwitterProfil.AlcoholVol,
            colour: TwitterProfil.Colour,
        };
        database.collection("id").doc(TwitterProfil.Id).set(data);
        return true;
    }

    deleteBeer(TwitterProfil){
        const database = admin.firestore();

        database.collection("id").doc(TwitterProfil.Id).remove();
        return true;
    }
    /*
      addBeer() {
      var docRef = env.collection('beer').doc('HK');
      var setAda = docRef.set({
        name: 'Heineken',
        pourcentage: "5"
      });
      }

      deleteBeer() {

      }
    }*/
}

module.exports = BeerDA;