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
exports.sendMessages = exports.CreateOrder = exports.getOrdersOfUser = void 0;
var types_1 = require("../../Public/types");
var orders_1 = require("../api/orders");
var loggers_1 = require("../utils/loggers");
var cart_1 = require("./cart");
var getOrdersOfUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userId, id, order, orders, error_1;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 7, , 8]);
                userId = (_a = req.session.dataUser) === null || _a === void 0 ? void 0 : _a._id;
                id = req.body.id;
                if (!userId) return [3 /*break*/, 6];
                if (!id) return [3 /*break*/, 4];
                if (!(id.length === 24)) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, orders_1.getOrderById)(id)];
            case 1:
                order = _b.sent();
                if (order) {
                    res.status(200).json({
                        OrdenBuscada: order,
                    });
                }
                else {
                    res.status(400).json({
                        Error: "ID of the wanted order doesn't exist."
                    });
                }
                return [3 /*break*/, 3];
            case 2:
                res.status(400).json({
                    Error: "ID entered doesn't exist because it is has less than 24 characters."
                });
                _b.label = 3;
            case 3: return [3 /*break*/, 6];
            case 4: return [4 /*yield*/, (0, orders_1.getOrders)(userId)];
            case 5:
                orders = _b.sent();
                if (orders.length > 0) {
                    res.status(200).json({
                        ordersOfTheUser: orders,
                    });
                }
                else {
                    res.status(400).json({
                        getOrdersOfUser: "None",
                    });
                }
                _b.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                error_1 = _b.sent();
                res.status(400).json({
                    error: error_1,
                });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.getOrdersOfUser = getOrdersOfUser;
var CreateOrder = function (data, userData) { return __awaiter(void 0, void 0, void 0, function () {
    var total, order, createdOrder, error_2;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 6, , 7]);
                if (!(data && userData)) return [3 /*break*/, 4];
                total = getTotal(data);
                if (!total) return [3 /*break*/, 3];
                _a = {
                    items: data,
                    userId: userData._id
                };
                return [4 /*yield*/, (0, orders_1.numberOfOrderCreator)()];
            case 1:
                order = (_a.numberOrder = (_b.sent()) + 1,
                    _a.state = types_1.states.generate,
                    _a.gmail = userData.gmail,
                    _a.total = total,
                    _a);
                return [4 /*yield*/, (0, orders_1.createOrder)(order)];
            case 2:
                createdOrder = _b.sent();
                return [2 /*return*/, createdOrder];
            case 3: return [3 /*break*/, 5];
            case 4:
                loggers_1.logger.error("Error debido a la data pasada");
                return [2 /*return*/, null];
            case 5: return [3 /*break*/, 7];
            case 6:
                error_2 = _b.sent();
                loggers_1.logger.error("Error: ".concat(error_2));
                return [2 /*return*/, error_2];
            case 7: return [2 /*return*/];
        }
    });
}); };
exports.CreateOrder = CreateOrder;
var getTotal = function (data) {
    var acumulator = 0;
    var precioFinal = data.map(function (item) {
        if (item) {
            return acumulator + item.price;
        }
    });
    var resultado = precioFinal.reduce(function (prev, current) {
        if (prev && current)
            return prev + current;
    });
    if (resultado)
        return resultado;
    else {
        loggers_1.logger.error("ERROR IN ORDERS CONTROLLER GET TOTAL");
        return undefined;
    }
};
var sendMessages = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var dataUser, idOfOrder, productsInCart, orderUpdated, order, productsHtml, content, message, done;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                dataUser = req.session.dataUser;
                idOfOrder = req.body.id;
                if (!(dataUser && idOfOrder)) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, cart_1.cartGet)(dataUser._id)];
            case 1:
                productsInCart = _a.sent();
                if (!(productsInCart !== undefined)) return [3 /*break*/, 6];
                return [4 /*yield*/, updateState(idOfOrder)];
            case 2:
                orderUpdated = _a.sent();
                return [4 /*yield*/, (0, orders_1.getOrderById)(idOfOrder)];
            case 3:
                order = _a.sent();
                if (!!orderUpdated) return [3 /*break*/, 4];
                res.status(400).json({
                    Error: "Order not found or in a state different from generated",
                });
                return [3 /*break*/, 6];
            case 4:
                if (!order) return [3 /*break*/, 6];
                productsHtml = productsInCart === null || productsInCart === void 0 ? void 0 : productsInCart.map(function (product) {
                    if (product !== undefined)
                        return "<li>Producto:<ul><li>Nombre del Producto:".concat(product.title, "</li><li>Precio total: $").concat(product.price, "</li><li>Imagen del producto: <img src=").concat(product.thumbnail, " alt=\"Image Not Found\"></li><li>Cantidad del producto: ").concat(product.amount, "</li></ul></li>");
                });
                content = "<div><h1>Productos:</h1><ul>".concat(productsHtml, "</ul><h2>Precio Total: $").concat(order.total, "</h2></div>");
                message = "Nuevo pedido de ".concat(dataUser.username, ". Email: ").concat(dataUser.gmail, ".\n                Productos: \n                ").concat(productsInCart.map(function (product) {
                    product !== undefined
                        ? "-".concat(product.title, ".\n                -").concat(product.price)
                        : "there are no products";
                }));
                return [4 /*yield*/, cartMsgSender(dataUser, "Nuevo pedido de ".concat(dataUser.username, ". Email: ").concat(dataUser.gmail), content, message)];
            case 5:
                done = _a.sent();
                if (done) {
                    res.json({
                        msg: "Order completed and sent.",
                    });
                }
                _a.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.sendMessages = sendMessages;
var cartMsgSender = function (dataUser, subjectEmail, contentEmail, messageWhatsApp) { return __awaiter(void 0, void 0, void 0, function () {
    var enviarEmail, sendWhatsAppResponse, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!(subjectEmail && contentEmail && messageWhatsApp)) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, orders_1.sendTheCartWithEmail)(dataUser.gmail, subjectEmail, contentEmail)];
            case 1:
                enviarEmail = _a.sent();
                return [4 /*yield*/, (0, orders_1.sendTheCartWithWhatsApp)("+".concat(dataUser.phoneNumber), messageWhatsApp)];
            case 2:
                sendWhatsAppResponse = _a.sent();
                if (enviarEmail && sendWhatsAppResponse) {
                    return [2 /*return*/, true];
                }
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                loggers_1.logger.error("Error: ", error_3);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
var updateState = function (idOfOrder) { return __awaiter(void 0, void 0, void 0, function () {
    var order;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!(idOfOrder.length === 24)) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, orders_1.getOrderById)(idOfOrder)];
            case 1:
                order = _a.sent();
                if (!(order && order.state === "Generado")) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, orders_1.updateOrder)({ _id: idOfOrder }, { $set: { state: "Enviado" } })];
            case 2: return [2 /*return*/, _a.sent()];
            case 3:
                loggers_1.logger.warn("Error: el order states es diferente a generado");
                return [2 /*return*/, false];
            case 4: return [3 /*break*/, 6];
            case 5:
                loggers_1.logger.warn("El id enviado no tiene 24.");
                return [2 /*return*/, false];
            case 6: return [2 /*return*/];
        }
    });
}); };
