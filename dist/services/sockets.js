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
var io = require("socket.io");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var messages_1 = require("../api/messages");
var cart_1 = require("../controller/cart");
var config_1 = __importDefault(require("../config"));
var messages_interface_1 = require("../models/messages/messages.interface");
var loggers_1 = require("../utils/loggers");
var orders_1 = require("../api/orders");
var products_1 = require("../api/products");
var initWsServer = function (server) {
    var SocketServer = io(server);
    SocketServer.on("connection", function (socket, req) {
        socket.emit("bienvenidaAUsuario", {
            Bienvenida: "hola",
        });
        socket.on("resp-message", function (data) { return __awaiter(void 0, void 0, void 0, function () {
            var token, message, jwtObject_1, user, newMessage, messageComplete;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        token = data.token, message = data.message;
                        if (!(token && message)) return [3 /*break*/, 3];
                        user = jsonwebtoken_1.default.verify(token, config_1.default.JWT_SECRET_KEY, function (err, user) {
                            if (err) {
                                console.log(err);
                                return false;
                            }
                            else if (user) {
                                jwtObject_1 = user;
                                return user;
                            }
                        });
                        if (!(typeof user === "object" && jwtObject_1)) return [3 /*break*/, 2];
                        newMessage = {
                            userId: jwtObject_1.userId,
                            type: messages_interface_1.tipos.Usuario,
                            message: message,
                        };
                        return [4 /*yield*/, (0, messages_1.createMessage)(newMessage)];
                    case 1:
                        messageComplete = _a.sent();
                        socket.emit("imprimirMensaje", messageComplete);
                        return [3 /*break*/, 3];
                    case 2:
                        loggers_1.logger.error("No authorizado");
                        socket.emit("errorNoAutorizado", user);
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        socket.on("mensajeYaImpreso", function (data) { return __awaiter(void 0, void 0, void 0, function () {
            var _a, productos, response, messageFromSistem, messageComplete, ordenes, response, messageFromSistem, messageComplete, cart, response, messageFromSistem, messageComplete, response, messageFromSistem, messageComplete;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = data.message;
                        switch (_a) {
                            case "Stock": return [3 /*break*/, 1];
                            case "Orden": return [3 /*break*/, 5];
                            case "Carrito": return [3 /*break*/, 9];
                        }
                        return [3 /*break*/, 12];
                    case 1: return [4 /*yield*/, (0, products_1.getProducts)()];
                    case 2:
                        productos = _b.sent();
                        if (!Array.isArray(productos)) return [3 /*break*/, 4];
                        response = productos.map(function (element) {
                            return "||Producto: ".concat(element.title, ".\n              Precio: ").concat(element.price, ".\n              Stock: ").concat(element.stock, ".\n              Category: ").concat(element.category, "\n              Imagen: <img src=").concat(element.thumbnail, " alt=").concat(element.thumbnail, ">.");
                        }).join("    ");
                        if (!response) return [3 /*break*/, 4];
                        messageFromSistem = {
                            userId: data.userId,
                            type: messages_interface_1.tipos.Sistema,
                            message: response
                        };
                        return [4 /*yield*/, (0, messages_1.createMessage)(messageFromSistem)];
                    case 3:
                        messageComplete = _b.sent();
                        socket.emit("sistemResponse", messageComplete);
                        return [3 /*break*/, 14];
                    case 4: return [3 /*break*/, 14];
                    case 5: return [4 /*yield*/, (0, orders_1.getOrders)(data.userId)];
                    case 6:
                        ordenes = _b.sent();
                        response = ordenes.map(function (element) {
                            return "||Id de orden: ".concat(element._id, ".\n            Estado: ").concat(element.state, ".\n            Total: $").concat(element.total, ".");
                        }).join("    ");
                        if (!response) return [3 /*break*/, 8];
                        messageFromSistem = {
                            userId: data.userId,
                            type: messages_interface_1.tipos.Sistema,
                            message: response
                        };
                        return [4 /*yield*/, (0, messages_1.createMessage)(messageFromSistem)];
                    case 7:
                        messageComplete = _b.sent();
                        socket.emit("sistemResponse", messageComplete);
                        return [3 /*break*/, 14];
                    case 8: return [3 /*break*/, 14];
                    case 9: return [4 /*yield*/, (0, cart_1.cartGet)(data.userId)];
                    case 10:
                        cart = _b.sent();
                        response = cart === null || cart === void 0 ? void 0 : cart.map(function (element) {
                            return "||Producto en Carrito: \n            Nomber: ".concat(element === null || element === void 0 ? void 0 : element.title, ".\n            Precio total: ").concat(element === null || element === void 0 ? void 0 : element.price, ".\n            Cantidad: ").concat(element === null || element === void 0 ? void 0 : element.amount, ".");
                        });
                        if (!response) return [3 /*break*/, 12];
                        messageFromSistem = {
                            userId: data.userId,
                            type: messages_interface_1.tipos.Sistema,
                            message: response.join("    ")
                        };
                        return [4 /*yield*/, (0, messages_1.createMessage)(messageFromSistem)];
                    case 11:
                        messageComplete = _b.sent();
                        socket.emit("sistemResponse", messageComplete);
                        return [3 /*break*/, 14];
                    case 12:
                        response = "/------------------------------------------------------------------------------------------/\n          / Hola! No he podido comprender tu mensaje. Profavor ingresa una de las siguentes opciones /\n          /     - Stock: Para conocer nuestro stock actual.                                          /\n          /     - Orden: Para conocer la informacion de tu ultima orden.                             /\n          /     - Carrito: Para conocer el estado actual de tu carrito.                              /\n          /------------------------------------------------------------------------------------------/";
                        messageFromSistem = {
                            userId: data.userId,
                            type: messages_interface_1.tipos.Sistema,
                            message: response
                        };
                        return [4 /*yield*/, (0, messages_1.createMessage)(messageFromSistem)];
                    case 13:
                        messageComplete = _b.sent();
                        socket.emit("sistemResponse", messageComplete);
                        _b.label = 14;
                    case 14: return [2 /*return*/];
                }
            });
        }); });
    });
    return SocketServer;
};
exports.default = initWsServer;
