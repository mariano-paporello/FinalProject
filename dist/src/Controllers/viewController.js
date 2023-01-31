"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.homeview = void 0;
var products_1 = __importDefault(require("../models/products"));
var messages_1 = __importDefault(require("../models/messages"));
var homeview = function (req, res) {
    console.log(req.session);
    products_1.default.find({}).then(function (productos) {
        messages_1.default.find({}).then(function (mensajes) {
            res.render('main', {
                productos: productos.map(function (productoIndv) { return productoIndv.toJSON(); }),
                mensajes: mensajes.map(function (mensajeIndv) { return mensajeIndv.toJSON(); }),
                data: req.session.dataUser
            });
        });
    });
};
exports.homeview = homeview;
