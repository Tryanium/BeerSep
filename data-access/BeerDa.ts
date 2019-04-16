class BeerDA extends DataAccess {
    private _collection;

    constructor() {
        super();
        this.collection = this.database.collection("beers");
    }




    get collection() {
        return this._collection;
    }

    set collection(value) {
        this._collection = value;
    }
}
