"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeview = void 0;
var products_repository_1 = require("../models/products/products.repository");
var loggers_1 = require("../utils/loggers");
var homeview = function (req, res) {
    loggers_1.logger.info("METODO:" + req.method + " RUTA:" + req.url);
    products_repository_1.repositoryProduct.getAllProd().then(function (productos) {
        res.json({
            data: req.session.dataUser,
            productosDisponibles: productos.map(function (productoIndv) { return productoIndv.toJSON(); })
        });
    });
};
exports.homeview = homeview;
