var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BeerDa = /** @class */ (function (_super) {
    __extends(BeerDa, _super);
    function BeerDa() {
        var _this = _super.call(this) || this;
        _this.collection = _this.database.collection("beers");
        return _this;
    }
    BeerDa.prototype.getBeers = function (id) {
        if (id) {
            return this.collection.doc(id).get();
        }
        else {
            return this.collection.get();
        }
    };
    Object.defineProperty(BeerDa.prototype, "collection", {
        get: function () {
            return this._collection;
        },
        set: function (value) {
            this._collection = value;
        },
        enumerable: true,
        configurable: true
    });
    return BeerDa;
}(DataAccess));
module.exports = BeerDa;
