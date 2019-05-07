class BeerDa extends DataAccess {
    private _collection;

    constructor() {
        super();
        this.collection = this.database.collection("beers");
    }

    getBeers(id?) {
        if(id) {
            return this.collection.doc(id).get();
        } else {
            return this.collection.get();
        }
    }


    get collection() {
        return this._collection;
    }

    set collection(value) {
        this._collection = value;
    }
}

module.exports = BeerDa;
