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
    static getBeer(BeerForm, callback) {
        const database = admin.firestore();
        database.collection("name").doc(BeerForm.Name).get()
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
    static addBeer(BeerForm){
        const database = admin.firestore();
        let data = {
            name: BeerForm.Name,
            id: BeerForm.Id,
            alcoholVol: BeerForm.AlcoholVol,
            colour: BeerForm.Colour,
        };
        database.collection("id").doc(BeerForm.Id).set(data);
        return true;
    }

    static deleteBeer(BeerForm){
        const database = admin.firestore();

        database.collection("id").doc(BeerForm.Id).remove();
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