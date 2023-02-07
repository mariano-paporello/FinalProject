"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeview = void 0;
var products_1 = require("../models/products");
var loggers_1 = require("../utils/loggers");
var homeview = function (req, res) {
    loggers_1.logger.info("METODO:" + req.method + " RUTA:" + req.url);
    products_1.productoModel.getAllProd().then(function (productos) {
        res.json({
            data: req.session.dataUser,
            productosDisponibles: productos.map(function (productoIndv) { return productoIndv.toJSON(); })
        });
    });
};
exports.homeview = homeview;
