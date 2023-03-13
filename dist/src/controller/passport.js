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
exports.createUser = exports.searchUser = void 0;
var loggers_1 = require("../utils/loggers");
var user_repository_1 = require("../models/users/user.repository");
var cart_1 = require("./cart");
// CAMBIAR LA LOGICA PARA PODER PASARLO A CAPAS
var searchUser = function (req, password, username, done) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                console.log("DESDE PASSPORT USERNAME: ", username, " PASSWORD: ", password);
                return [4 /*yield*/, user_repository_1.repositoryUser.logIn(username, password)];
            case 1:
                user = _a.sent();
                if (!(user && typeof user !== "boolean")) return [3 /*break*/, 3];
                return [4 /*yield*/, (0, cart_1.ifCartExist)(user)];
            case 2:
                _a.sent();
                req.session.dataUser = user;
                req.session.gmail = user.gmail;
                req.session.username = user.username;
                return [2 /*return*/, done(null, user)];
            case 3:
                if (typeof user === "boolean") {
                    return [2 /*return*/, done(null, false, { msg: "Usuario no encontrado debido a que dio false" })];
                }
                else {
                    return [2 /*return*/, done(null, false, { msg: "Usuario no encontrado debido a que dio undefined" })];
                }
                _a.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                err_1 = _a.sent();
                loggers_1.logger.error("Error: ", err_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.searchUser = searchUser;
var createUser = function (req, password, username, done) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, gmail, age, phoneNumber, image, user, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 4, , 5]);
                _a = req.body, gmail = _a.gmail, age = _a.age, phoneNumber = _a.phoneNumber, image = _a.image;
                if (!(gmail && age && phoneNumber && image && password && username)) return [3 /*break*/, 3];
                return [4 /*yield*/, user_repository_1.repositoryUser.singUp({
                        gmail: gmail,
                        password: password,
                        age: age,
                        phoneNumber: phoneNumber,
                        image: image,
                        username: username
                    })];
            case 1:
                user = _b.sent();
                req.session.gmail = user.gmail;
                req.session.username = user.username;
                return [4 /*yield*/, (0, cart_1.ifCartExist)(user)];
            case 2:
                _b.sent();
                return [2 /*return*/, done(null, user)];
            case 3: return [2 /*return*/, done(null, false, { message: "Error debido a falta de alguno de los campos." })];
            case 4:
                err_2 = _b.sent();
                return [2 /*return*/, done(null, false, { mensaje: 'Error Inesperado', err: err_2 })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createUser = createUser;
