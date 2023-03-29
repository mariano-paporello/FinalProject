"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDao = void 0;
var mongodb_1 = require("./daos/mongodb");
var minimist_1 = __importDefault(require("minimist"));
var loggers_1 = require("../../utils/loggers");
var message_schema_1 = require("./schema/message.schema");
var dao;
var args = (0, minimist_1.default)(process.argv);
switch (args.database.toLowerCase()) {
    case 'mongo':
        if (args) {
            dao = new mongodb_1.DaoMongoDB('menssages', message_schema_1.messagesSchema);
            dao.initMongoDB();
            break;
        }
    default:
        loggers_1.logger.error("Error en factory de messages al seleccionar Db (inicinado con la default)");
        dao = new mongodb_1.DaoMongoDB('menssages', message_schema_1.messagesSchema);
        dao.initMongoDB();
        break;
}
;
function getDao() {
    return dao;
}
exports.getDao = getDao;
;
