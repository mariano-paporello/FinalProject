"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asDto = void 0;
var ProductsDTO = /** @class */ (function () {
    function ProductsDTO(cartOfUser) {
        this.id = cartOfUser._id;
        this.userId = cartOfUser.userId;
        this.cart = cartOfUser.cart;
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
