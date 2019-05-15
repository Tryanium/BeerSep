class BeerSearch {

    constructor (beerBody) {
        this._name = beerBody.name;
        this._origin = beerBody.origin;
        this._alcohol = beerBody.alcohol;
        this._type = beerBody.type;
        this._color = beerBody.color;
    }

    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }

    get origin() {
        return this._origin;
    }

    set origin(value) {
        this._origin = value;
    }

    get alcohol() {
        return this._alcohol;
    }

    set alcohol(value) {
        this._alcohol = value;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
    }
}

module.exports = BeerSearch;
