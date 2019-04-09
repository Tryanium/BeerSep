//var db = admin.firestore();

class BeerDA {

  addBeer() {
  var docRef = db.collection('beer').doc('HK');
  var setAda = docRef.set({
    name: 'Heineken',
    pourcentage: "5"
  });
  }

  deleteBeer() {

  }
}
