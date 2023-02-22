"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asDto = void 0;
var ProductsDTO = /** @class */ (function () {
    function ProductsDTO(_a) {
        var _id = _a._id, gmail = _a.gmail, password = _a.password, username = _a.username, age = _a.age, image = _a.image, phoneNumber = _a.phoneNumber;
        this.id = _id;
        this.gmail = gmail;
        this.username = username;
        this.password = password;
        this.age = age;
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
