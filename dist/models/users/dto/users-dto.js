"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asDto = void 0;
var ProductsDTO = /** @class */ (function () {
    function ProductsDTO(_a) {
        var id = _a.id, gmail = _a.gmail, username = _a.username, image = _a.image, phoneNumber = _a.phoneNumber;
        this.id = id;
        this.gmail = gmail;
        this.username = username;
        this.image = image;
        this.phoneNumber = phoneNumber;
    }
    return ProductsDTO;
}());
function asDto(users) {
    if (Array.isArray(users)) {
        var products = users.map(function (element) { return new ProductsDTO(element); });
        return products;
    }
    else {
        var product = new ProductsDTO(users);
        return product;
    }
}
exports.asDto = asDto;
