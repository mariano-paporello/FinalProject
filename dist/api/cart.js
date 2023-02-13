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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkCart = exports.emptyCartCreator = exports.cartMsgSender = exports.cartGet = void 0;
var index_1 = __importDefault(require("../config/index"));
var email_1 = require("../services/email");
var twilio_1 = require("../services/twilio");
var cart_1 = require("../models/cart");
var products_1 = require("../models/products");
var loggers_1 = require("../utils/loggers");
var cartGet = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var cartOfUser, productsInCart, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, cart_1.cartModel.getCartByQuery({ userId: id })];
            case 1:
                cartOfUser = _a.sent();
                return [4 /*yield*/, Promise.all(cartOfUser.cart.map(function (product) { return __awaiter(void 0, void 0, void 0, function () {
                        var productFound;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, products_1.productoModel.getProductByQuery({ _id: product.productId })];
                                case 1:
                                    productFound = _a.sent();
                                    return [2 /*return*/, productFound];
                            }
                        });
                    }); })).then(function (result) {
                        return result;
                    })];
            case 2:
                productsInCart = _a.sent();
                return [2 /*return*/, productsInCart];
            case 3:
                error_1 = _a.sent();
                loggers_1.logger.error("Error: ", error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.cartGet = cartGet;
var cartMsgSender = function (dataUser, subject, content, products) { return __awaiter(void 0, void 0, void 0, function () {
    var enviarEmail, message, whatsapp, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                console.log(index_1.default.GMAIL_ADDRESS, index_1.default.GMAIL_PASSWORD);
                return [4 /*yield*/, email_1.EmailService.sendEmail(dataUser.gmail, subject, content)];
            case 1:
                enviarEmail = _a.sent();
                message = "Nuevo pedido de ".concat(dataUser.username, ". Email: ").concat(dataUser.gmail, ".\n        Productos: \n        ").concat(products.map(function (product) {
                    return "-".concat(product.title, ".\n        -").concat(product.price);
                }));
                console.log(message);
                return [4 /*yield*/, twilio_1.whatsappService.sendWhatsAppMessage("+".concat(dataUser.phoneNumber), message)];
            case 2:
                whatsapp = _a.sent();
                return [2 /*return*/, true];
            case 3:
                error_2 = _a.sent();
                loggers_1.logger.error("Error: ", error_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.cartMsgSender = cartMsgSender;
var emptyCartCreator = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var emptyCart, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, cart_1.cartModel.createCart({ userId: id, cart: [] })];
            case 1:
                emptyCart = _a.sent();
                return [2 /*return*/, emptyCart];
            case 2:
                error_3 = _a.sent();
                loggers_1.logger.error("Error: ", error_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.emptyCartCreator = emptyCartCreator;
var checkCart = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var cartFound, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, cart_1.cartModel.getCartByQuery({ userId: id })];
            case 1:
                cartFound = _a.sent();
                return [2 /*return*/, cartFound];
            case 2:
                error_4 = _a.sent();
                loggers_1.logger.error("Error: ", error_4);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.checkCart = checkCart;
