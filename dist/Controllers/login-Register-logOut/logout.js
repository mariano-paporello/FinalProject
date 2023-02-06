"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
var loggers_1 = require("../../utils/loggers");
var logged_1 = require("../../utils/logged");
var logout = function (req, res) {
    loggers_1.logger.info("METODO:" + req.method + " RUTA:" + req.url);
    if (req.session.username) {
        res.json({
            logoutFromThisUser: req.session.username
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
