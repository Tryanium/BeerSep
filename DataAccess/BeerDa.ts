class BeerDA {
  const db = admin.firestore();

  function addBeer() {
  var docRef = db.collection('beer').doc('HK');
  var setAda = docRef.set({
    name: 'Heineken',
    pourcentage: "5"
  });
  }

  funciton deleteBeer() {

  }
}
