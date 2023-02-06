"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var express_handlebars_1 = require("express-handlebars");
var compression_1 = __importDefault(require("compression"));
var loggers_1 = require("../utils/loggers");
var index_1 = __importDefault(require("../routes/index"));
var paths_1 = require("../utils/paths");
var helmet_1 = __importDefault(require("helmet"));
var app = (0, express_1.default)();
app.use("/", index_1.default);
app.use((0, compression_1.default)());
app.use((0, helmet_1.default)());
// HBS PART:
app.set('view engine', 'hbs');
app.set('views', paths_1.viewPath);
app.engine('hbs', (0, express_handlebars_1.engine)(paths_1.paths));
app.get('*', function (req, res) {
    loggers_1.logger.warn("METODO:" + req.method + " RUTA:" + req.url);
    res.status(404).json({ Error: "Inexistent route" });
});
app.post('*', function (req, res) {
    loggers_1.logger.warn("METODO:" + req.method + " RUTA:" + req.url);
    res.status(404).json({ Error: "Inexistent route" });
});
var HTTPServer = new http_1.default.Server(app);
module.exports = HTTPServer;
