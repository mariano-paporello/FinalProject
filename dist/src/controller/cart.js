"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCartProducts = exports.productToCartController = exports.ifCartExist = exports.createCartOfUser = exports.cartSender = exports.cartGet = exports.cart = void 0;
var cart_1 = require("../api/cart");
var loggers_1 = require("../utils/loggers");
var products_1 = require("../api/products");
var orders_1 = require("./orders");
var cart_repository_1 = require("../models/cart/cart.repository");
var cart = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productsInCart;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.session.dataUser) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, exports.cartGet)(req.session.dataUser._id)];
            case 1:
                productsInCart = _a.sent();
                if (productsInCart) {
                    res.json({
                        carrito: productsInCart
                    });
                }
                _a.label = 2;
            case 2: return [2 /*return*/];
        }
    });
}); };
exports.cart = cart;
var cartGet = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var cartOfUser, products, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, (0, cart_1.getCartByQuery)({ userId: id })];
            case 1:
                cartOfUser = _a.sent();
                if (!(cartOfUser !== null)) return [3 /*break*/, 3];
                return [4 /*yield*/, cartTransformer(cartOfUser)];
            case 2:
                products = _a.sent();
                return [2 /*return*/, products];
            case 3: return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                loggers_1.logger.error("Error: ", error_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.cartGet = cartGet;
var cartTransformer = function (cartOfUser) { return __awaiter(void 0, void 0, void 0, function () {
    var productsInCart, FinalProductForm;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, Promise.all(cartOfUser.cart.map(function (product) { return __awaiter(void 0, void 0, void 0, function () {
                    var producto;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, getProduct(product)];
                            case 1:
                                producto = _a.sent();
                                return [2 /*return*/, producto];
                        }
                    });
                }); }))];
            case 1:
                productsInCart = _a.sent();
                return [4 /*yield*/, Promise.all(productsInCart.map(function (productFromProducts) { return __awaiter(void 0, void 0, void 0, function () {
                        var _a;
                        return __generator(this, function (_b) {
                            switch (_b.label) {
                                case 0:
                                    if (!(productFromProducts !== undefined)) return [3 /*break*/, 2];
                                    _a = modifyTheProductToLookGood;
                                    return [4 /*yield*/, productFromProducts];
                                case 1: return [2 /*return*/, _a.apply(void 0, [_b.sent(), cartOfUser])];
                                case 2: return [2 /*return*/];
                            }
                        });
                    }); }))];
            case 2:
                FinalProductForm = _a.sent();
                return [2 /*return*/, FinalProductForm];
        }
    });
}); };
var getProduct = function (product) { return __awaiter(void 0, void 0, void 0, function () {
    var productFound;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, products_1.getProductById)(product.productId)];
            case 1:
                productFound = _a.sent();
                if (productFound !== null) {
                    return [2 /*return*/, productFound];
                }
                return [2 /*return*/];
        }
    });
}); };
var modifyTheProductToLookGood = function (productFromProducts, cartOfUser) { return __awaiter(void 0, void 0, void 0, function () {
    var title, price, thumbnail, id, productInCart, theProductInTheCart;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!productFromProducts) return [3 /*break*/, 2];
                title = productFromProducts.title, price = productFromProducts.price, thumbnail = productFromProducts.thumbnail;
                id = productFromProducts.id;
                return [4 /*yield*/, Promise.all(cartOfUser.cart.filter(function (productInCart) { return productFromProducts.id === productInCart.productId; }))];
            case 1:
                productInCart = _a.sent();
                theProductInTheCart = { id: id, title: title, priceUnit: price, price: price * productInCart[0].amount, thumbnail: thumbnail, amount: productInCart[0].amount };
                return [2 /*return*/, theProductInTheCart];
            case 2: return [2 /*return*/];
        }
    });
}); };
var cartSender = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dataUser, productsInCart, order, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                dataUser = req.session.dataUser;
                if (!dataUser) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, exports.cartGet)(dataUser._id)];
            case 1:
                productsInCart = _a.sent();
                if (!(productsInCart !== undefined)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, orders_1.CreateOrder)(productsInCart, req.session.dataUser)];
            case 2:
                order = _a.sent();
                if (order) {
                    res.status(201).json({
                        order: order
                    });
                }
                else {
                    loggers_1.logger.error("Error: Error al crear orden de compra");
                    res.status(400).json({
                        error: "Error al crear orden de compra"
                    });
                }
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                err_1 = _a.sent();
                loggers_1.logger.error("Error: ", err_1);
                res.status(400).json({
                    error: err_1
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.cartSender = cartSender;
var createCartOfUser = function (dataUser) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    switch (_a.label) {
        case 0: return [4 /*yield*/, (0, cart_1.emptyCartCreator)(dataUser._id)];
        case 1: return [2 /*return*/, _a.sent()];
    }
}); }); };
exports.createCartOfUser = createCartOfUser;
var ifCartExist = function (dataUser) { return __awaiter(void 0, void 0, void 0, function () {
    var cartFound;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, cart_1.checkCart)(dataUser._id)];
            case 1:
                cartFound = _a.sent();
                return [2 /*return*/, cartFound ? null : (0, exports.createCartOfUser)(dataUser)];
        }
    });
}); };
exports.ifCartExist = ifCartExist;
var productToCartController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var product, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, (0, products_1.getProductById)(req.params.id)];
            case 1:
                product = _a.sent();
                if (!(req.session.dataUser && product !== undefined && product !== null)) return [3 /*break*/, 3];
                return [4 /*yield*/, añadirProdACart(req.session.dataUser, product)];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                res.json({
                    msg: "👍 👍 👍 👍 TODO BIENN ",
                });
                return [3 /*break*/, 5];
            case 4:
                err_2 = _a.sent();
                loggers_1.logger.error("Error in productsController: ", err_2);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.productToCartController = productToCartController;
var añadirProdACart = function (dataUser, product) { return __awaiter(void 0, void 0, void 0, function () {
    var userHasCart, index;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!product) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, cart_1.getCartByUserId)({ userId: dataUser._id })];
            case 1:
                userHasCart = _a.sent();
                if (!(userHasCart !== null)) return [3 /*break*/, 6];
                return [4 /*yield*/, getIndex(userHasCart, product)];
            case 2:
                index = _a.sent();
                if (!(userHasCart && index != -1 && index || index === 0)) return [3 /*break*/, 4];
                return [4 /*yield*/, addProduct(userHasCart, index, dataUser)];
            case 3: return [2 /*return*/, _a.sent()];
            case 4:
                if (!(userHasCart && index === -1)) return [3 /*break*/, 6];
                return [4 /*yield*/, addQuantityInCart(product, dataUser)];
            case 5: return [2 /*return*/, _a.sent()];
            case 6: return [2 /*return*/, product];
        }
    });
}); };
var getIndex = function (cartOfUser, product) { return __awaiter(void 0, void 0, void 0, function () {
    var index;
    return __generator(this, function (_a) {
        index = cartOfUser.cart.findIndex(function (obj) {
            if (product) {
                return obj.productId === product.id;
            }
        });
        return [2 /*return*/, index];
    });
}); };
var addProduct = function (cartOfUser, index, dataUser) { return __awaiter(void 0, void 0, void 0, function () {
    var newCart, addAmountToaProduct, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                newCart = cartOfUser.cart;
                newCart[index] = { productId: newCart[index].productId, amount: newCart[index].amount + 1 };
                return [4 /*yield*/, (0, cart_1.updateCart)({ userId: dataUser._id }, { $set: { cart: newCart } })];
            case 1:
                addAmountToaProduct = _a.sent();
                return [2 /*return*/, addAmountToaProduct];
            case 2:
                err_3 = _a.sent();
                loggers_1.logger.error("Error: ", err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
var addQuantityInCart = function (product, dataUser) { return __awaiter(void 0, void 0, void 0, function () {
    var addOneProductToExistingCart, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                if (!product) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, cart_1.updateCart)({ userId: dataUser._id }, { $push: { cart: { productId: product._id, amount: 1 } } })];
            case 1:
                addOneProductToExistingCart = _a.sent();
                return [2 /*return*/, addOneProductToExistingCart];
            case 2: return [3 /*break*/, 4];
            case 3:
                err_4 = _a.sent();
                loggers_1.logger.error("Error: ", err_4);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var deleteCartProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idOfUser, _a, id_1, cuantity, carrito, index, numberOfAmountOfThatProduct, filterCarrito, newCart, product, newCart, error_2;
    var _b, _c, _d, _e;
    return __generator(this, function (_f) {
        switch (_f.label) {
            case 0:
                _f.trys.push([0, 9, , 10]);
                idOfUser = (_b = req.session.dataUser) === null || _b === void 0 ? void 0 : _b._id;
                _a = req.body, id_1 = _a.id, cuantity = _a.cuantity;
                if (!(idOfUser && id_1.length === 24 && cuantity)) return [3 /*break*/, 8];
                return [4 /*yield*/, (0, exports.cartGet)(idOfUser)];
            case 1:
                carrito = _f.sent();
                if (!carrito) return [3 /*break*/, 8];
                index = carrito.findIndex(function (element) {
                    return element.id === id_1;
                });
                if (!(index != -1 && index || index === 0)) return [3 /*break*/, 7];
                numberOfAmountOfThatProduct = (_c = carrito[index]) === null || _c === void 0 ? void 0 : _c.amount;
                filterCarrito = carrito.map(function (element) {
                    var productObj = {
                        productId: element.id !== id_1 ? element.id : false,
                        amount: element.amount
                    };
                    if (productObj.productId) {
                        return productObj;
                    }
                }).filter(function (element) { return element !== undefined; });
                if (!(numberOfAmountOfThatProduct && Number(cuantity) >= numberOfAmountOfThatProduct)) return [3 /*break*/, 3];
                return [4 /*yield*/, cart_repository_1.repositoryCart.updateCart({ userId: idOfUser }, { $set: { cart: filterCarrito } })];
            case 2:
                newCart = _f.sent();
                if (newCart.acknowledged && newCart.modifiedCount > 0) {
                    res.status(200).json({
                        msg: "Producto en carrito borrado correctamente."
                    });
                }
                return [3 /*break*/, 6];
            case 3:
                if (!(numberOfAmountOfThatProduct && numberOfAmountOfThatProduct > Number(cuantity))) return [3 /*break*/, 5];
                product = {
                    productId: (_d = carrito[index]) === null || _d === void 0 ? void 0 : _d.id,
                    amount: Number((_e = carrito[index]) === null || _e === void 0 ? void 0 : _e.amount) - cuantity
                };
                filterCarrito.push(product);
                return [4 /*yield*/, cart_repository_1.repositoryCart.updateCart({ userId: idOfUser }, { $set: { cart: filterCarrito } })];
            case 4:
                newCart = _f.sent();
                if (newCart.acknowledged && newCart.modifiedCount > 0) {
                    res.status(200).json({
                        msg: "Producto en carrito actualizado"
                    });
                }
                return [3 /*break*/, 6];
            case 5:
                res.status(400).json({
                    Error: "Error al revisar que cantidad se quiere borrar"
                });
                _f.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                res.status(400).json({
                    Error: "Producto no encontrado en su carrito"
                });
                _f.label = 8;
            case 8: return [3 /*break*/, 10];
            case 9:
                error_2 = _f.sent();
                loggers_1.logger.error(error_2);
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.deleteCartProducts = deleteCartProducts;
