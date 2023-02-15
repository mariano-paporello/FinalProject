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
exports.ifCartExist = exports.createCartOfUser = exports.cartSender = exports.cart = void 0;
var cart_1 = require("../api/cart");
var loggers_1 = require("../utils/loggers");
var cart = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productsInCart;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, cart_1.cartGet)(req.session.dataUser._id)];
            case 1:
                productsInCart = _a.sent();
                console.log(productsInCart, req.session.dataUser._id);
                res.json({
                    productsInCart: productsInCart
                });
                return [2 /*return*/];
        }
    });
}); };
exports.cart = cart;
var cartSender = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dataUser, productsInCart, productsHtml, content, done, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                dataUser = req.session.dataUser;
                return [4 /*yield*/, (0, cart_1.cartGet)(dataUser._id)];
            case 1:
                productsInCart = _a.sent();
                productsHtml = productsInCart === null || productsInCart === void 0 ? void 0 : productsInCart.map(function (product) { return "<li>".concat(product, "</li>"); });
                content = "<div><h1>Productos:</h1><ul>".concat(productsHtml, "</ul></div>");
                return [4 /*yield*/, (0, cart_1.cartMsgSender)(dataUser, "Nuevo pedido de ".concat(dataUser.username, ". Email: ").concat(dataUser.gmail), content, productsInCart)];
            case 2:
                done = _a.sent();
                if (done) {
                    res.json({
                        msg: "TODO PERFECTO EMAIL ENVIADO"
                    });
                }
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                loggers_1.logger.error("Error: ", err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
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
