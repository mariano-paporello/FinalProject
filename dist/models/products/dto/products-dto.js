"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asDto = void 0;
var ProductsDTO = /** @class */ (function () {
    function ProductsDTO(_a) {
        var title = _a.title, price = _a.price, thumbnail = _a.thumbnail, stock = _a.stock;
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.stock = stock;
    }
    return ProductsDTO;
}());
function asDto(products) {
    if (Array.isArray(products))
        return products.map(function (element) { return new ProductsDTO(element); });
    else
        return new ProductsDTO(products);
}
exports.asDto = asDto;
