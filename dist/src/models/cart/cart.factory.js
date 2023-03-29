"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDao = void 0;
var mongodb_1 = require("./daos/mongodb");
var minimist_1 = __importDefault(require("minimist"));
var cart_schema_1 = require("./schema/cart.schema");
var loggers_1 = require("../../utils/loggers");
var dao;
var args = (0, minimist_1.default)(process.argv);
switch (args.database.toLowerCase()) {
    // agregar mÁs DB
    case 'mongo':
        dao = new mongodb_1.DaoMongoDB('carts', cart_schema_1.cartSchema);
        dao.initMongoDB();
        break;
    default:
        loggers_1.logger.error("Error al querer seleccionar DB en Carrito(iniciando con la default)");
        dao = new mongodb_1.DaoMongoDB('carts', cart_schema_1.cartSchema);
        dao.initMongoDB();
        break;
}
;
function getDao() {
    return dao;
}
exports.getDao = getDao;
;
