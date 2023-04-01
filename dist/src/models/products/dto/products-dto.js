"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asDto = void 0;
var ProductsDTO = /** @class */ (function () {
    function ProductsDTO(product) {
        this.id = product._id;
        this.title = product.title;
        this.price = product.price;
        this.thumbnail = product.thumbnail;
        this.stock = product.stock;
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
