"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggedIsNotDestroyed = exports.isLogged = void 0;
var logged_1 = require("../utils/logged");
var loggers_1 = require("../utils/loggers");
var isLogged = function (req, res, next) {
    if (logged_1.logged && logged_1.logged.islogged) {
        next();
    }
    else {
        loggers_1.logger.error("METODO:" + req.method + " RUTA:" + req.url);
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
        loggers_1.logger.error("METODO:" + req.method + " RUTA:" + req.url);
        res.status(400).json({
            Error: "Session destroyed"
        });
    }
};
exports.loggedIsNotDestroyed = loggedIsNotDestroyed;
