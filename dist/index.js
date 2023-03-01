"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var server = require('./services/server');
var initWsServer = require("./services/sockets");
var minimist_1 = __importDefault(require("minimist"));
var os_1 = __importDefault(require("os"));
var cluster_1 = __importDefault(require("cluster"));
var config_1 = __importDefault(require("./config"));
var loggers_1 = require("./utils/loggers");
var args = (0, minimist_1.default)(process.argv);
var port = args.port || config_1.default.PORT;
var numCPUs = os_1.default.cpus().length;
initWsServer(server);
if (args.modo === "CLUSTER" && cluster_1.default.isPrimary) {
    loggers_1.logger.info("💡💡💡 TIPO CLUSTER");
    for (var i = 0; i < numCPUs; i++) {
        cluster_1.default.fork();
    }
    cluster_1.default.on('exit', function (worker, code) {
        loggers_1.logger.info("Worker ".concat(worker.process.pid, " with code ").concat(code));
        cluster_1.default.fork();
    });
}
else {
    loggers_1.logger.info("💩💩💩 TIPO FORK");
    server.listen(port, function () {
        loggers_1.logger.info("Server is up in ".concat(port));
    });
}
server.on('error', function (err) {
    loggers_1.logger.error('SERVER ERROR: ', err);
});
// Log on exit
process.on('exit', function (code) {
    loggers_1.logger.error("Exit ==> El proceso termino con codigo ".concat(code, "\n\n"));
});
exports.default = server;
