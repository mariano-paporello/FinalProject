"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDao = void 0;
var mongodb_1 = require("./daos/mongodb");
var products_schema_1 = require("./schema/products.schema");
var minimist_1 = __importDefault(require("minimist"));
var loggers_1 = require("../../utils/loggers");
var dao;
var args = (0, minimist_1.default)(process.argv);
if (args.database) {
    var database = args.database.toLowerCase();
    switch (database) {
        // agregar mÁs DB
        case 'mongo':
            if (args.testing) {
                dao = new mongodb_1.DaoMongoDB("testing-products", products_schema_1.productoSchema);
                dao.initMongoDB();
                break;
            }
            else {
                dao = new mongodb_1.DaoMongoDB('productos', products_schema_1.productoSchema);
                dao.initMongoDB();
                break;
            }
        default:
            loggers_1.logger.error("Error en factory al seleccionar Db");
            dao = new mongodb_1.DaoMongoDB('productos', products_schema_1.productoSchema);
            dao.initMongoDB();
            break;
    }
}
else {
    dao = new mongodb_1.DaoMongoDB('productos', products_schema_1.productoSchema);
    dao.initMongoDB();
}
function getDao() {
    return dao;
}
exports.getDao = getDao;
;
