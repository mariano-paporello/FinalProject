"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profileGet = void 0;
var loggers_1 = require("../../utils/loggers");
var profileGet = function (req, res) {
    loggers_1.logger.info("METODO:" + req.method + " RUTA:" + req.url);
    res.json({
        data: req.session.dataUser
    });
};
exports.profileGet = profileGet;
