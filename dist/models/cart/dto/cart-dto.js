"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asDto = void 0;
var ProductsDTO = /** @class */ (function () {
    function ProductsDTO(_a) {
        var _id = _a._id, userId = _a.userId, cart = _a.cart;
        this.id = _id;
        this.userId = userId;
        this.cart = cart;
    }
    return ProductsDTO;
}());
function asDto(cart) {
    if (Array.isArray(cart))
        return cart.map(function (element) { return new ProductsDTO(element); });
    else
        return new ProductsDTO(cart);
}
exports.asDto = asDto;
