"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDao = void 0;
var minimist_1 = __importDefault(require("minimist"));
var loggers_1 = require("../../utils/loggers");
var mongodb_1 = __importDefault(require("./daos/mongodb"));
var users_schema_1 = __importDefault(require("./schema/users.schema"));
var dao;
var args = (0, minimist_1.default)(process.argv);
if (args.database) {
    var database = args.database.toLowerCase();
    switch (database) {
        // agregar mÁs DB
        case 'mongo':
            dao = new mongodb_1.default('users', users_schema_1.default);
            dao.initMongoDB();
            break;
        default:
            loggers_1.logger.error("Error al querer seleccionar DB en users");
            dao = new mongodb_1.default('users', users_schema_1.default);
            dao.initMongoDB();
            break;
    }
}
else {
    dao = new mongodb_1.default('users', users_schema_1.default);
    dao.initMongoDB();
}
function getDao() {
    return dao;
}
exports.getDao = getDao;
;
