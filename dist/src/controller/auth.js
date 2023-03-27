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
exports.isAdmin = exports.loggedIsNotDestroyed = exports.isLogged = exports.logout = exports.registerGet = exports.register = exports.logInGet = exports.logIn = void 0;
var passport_1 = __importDefault(require("passport"));
var loggers_1 = require("../utils/loggers");
var user_1 = require("./user");
var logged_1 = require("../utils/logged");
// LOGIN LOGIC
var logIn = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        if (req.body.password === req.body.passwordConfirm) {
            passport_1.default.authenticate('login', {}, function (err, user, info) { return __awaiter(void 0, void 0, void 0, function () {
                var token;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            loggers_1.logger.info("METODO:" + req.method + " RUTA:" + req.url);
                            if (!(user.gmail && user._id)) return [3 /*break*/, 2];
                            logged_1.logged.nombre = user.username;
                            logged_1.logged.contraseña = true;
                            logged_1.logged.islogged = true;
                            logged_1.logged.isDestroyed = false;
                            return [4 /*yield*/, (0, user_1.generateToken)(user)];
                        case 1:
                            token = _a.sent();
                            res.header("Authorization", "Bearer ".concat(token)).status(200).json({
                                msg: 'login OK',
                                token: token
                            });
                            return [3 /*break*/, 3];
                        case 2:
                            loggers_1.logger.error("Datos ingresados no validos o nulos");
                            res.status(400).json({
                                Error: "Datos ingresados no validos o nulos."
                            });
                            _a.label = 3;
                        case 3: return [2 /*return*/];
                    }
                });
            }); })(req, res, next);
        }
        else {
            loggers_1.logger.error("Contraseñas ingresadas no son iguales");
            res.status(400).json({
                Error: "Las contraseñas ingresadas no son iguales"
            });
        }
        return [2 /*return*/];
    });
}); };
exports.logIn = logIn;
var logInGet = function (req, res) {
    loggers_1.logger.info("METODO:" + req.method + " RUTA:" + req.url);
    logged_1.logged.isDestroyed = false;
    res.json({ msg: "Estas en logIn" });
};
exports.logInGet = logInGet;
// REGISTER LOGIC
var register = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        loggers_1.logger.info("METODO:" + req.method + " RUTA:" + req.url);
        if (req.body.password === req.body.passwordConfirm) {
            passport_1.default.authenticate('signup', {}, function (err, user, info) { return __awaiter(void 0, void 0, void 0, function () {
                var _a, gmail, username, age, phoneNumber, image, password, token;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = req.body, gmail = _a.gmail, username = _a.username, age = _a.age, phoneNumber = _a.phoneNumber, image = _a.image, password = _a.password;
                            if (!username || !gmail || !age || !phoneNumber || !image || !password) {
                                res.status(400).json({
                                    Error: "Datos ingresados no validos o nulos"
                                });
                            }
                            return [4 /*yield*/, (0, user_1.generateToken)(user)];
                        case 1:
                            token = _b.sent();
                            logged_1.logged.nombre = username;
                            logged_1.logged.contraseña = true;
                            logged_1.logged.islogged = true;
                            logged_1.logged.isDestroyed = false;
                            res.header("authorization", "Bearer ".concat(token)).json({
                                token: token
                            });
                            return [2 /*return*/];
                    }
                });
            }); })(req, res, next);
        }
        else {
            loggers_1.logger.error("Contraseñas ingresadas no son iguales");
            res.status(400).json({
                Error: "Las contraseñas ingresadas no son iguales"
            });
        }
        return [2 /*return*/];
    });
}); };
exports.register = register;
var registerGet = function (req, res) {
    loggers_1.logger.info("METODO:" + req.method + " RUTA:" + req.url);
    logged_1.logged.isDestroyed = false;
    res.json({ msg: "Estas en la Ruta register" });
};
exports.registerGet = registerGet;
// LOGOUT LOGIC
var logout = function (req, res) {
    var _a;
    loggers_1.logger.info("METODO:" + req.method + " RUTA:" + req.url);
    if (req.session.gmail) {
        res.json({
            logoutFromThisUser: (_a = req.session.dataUser) === null || _a === void 0 ? void 0 : _a.username
        });
        logged_1.logged.islogged = false;
        logged_1.logged.nombre = "";
        logged_1.logged.isDestroyed = true;
    }
    else {
        res.json({ err: "No hay data del usuario" });
    }
};
exports.logout = logout;
// Auth middlewares
var isLogged = function (req, res, next) {
    if (logged_1.logged && logged_1.logged.islogged) {
        next();
    }
    else {
        loggers_1.logger.error("METODO:" + req.method + " RUTA:" + req.url + "User is Nos logged");
        res.status(400).json({
            Error: "Not Logged"
        });
    }
};
exports.isLogged = isLogged;
var loggedIsNotDestroyed = function (req, res, next) {
    if (logged_1.logged && !logged_1.logged.isDestroyed) {
        next();
    }
    else {
        loggers_1.logger.error("METODO:" + req.method + " RUTA:" + req.url + "Not logged because the session is destroyed");
        res.status(400).json({
            Error: "Session destroyed"
        });
    }
};
exports.loggedIsNotDestroyed = loggedIsNotDestroyed;
var isAdmin = function (req, res, next) {
    if (req.session.admin) {
        next();
    }
    else {
        loggers_1.logger.error("METODO:" + req.method + " RUTA:" + req.url + " User is not type Admin");
        res.status(401).json({
            Error: "Not authorized"
        });
    }
};
exports.isAdmin = isAdmin;
