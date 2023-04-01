"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var path_1 = __importDefault(require("path"));
var express_handlebars_1 = require("express-handlebars");
var compression_1 = __importDefault(require("compression"));
var loggers_1 = require("../utils/loggers");
var index_1 = __importDefault(require("../routes/index"));
var paths_1 = require("../paths");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_session_1 = __importDefault(require("express-session"));
var storeOptions_1 = require("../api/storeOptions");
var passport_1 = __importDefault(require("passport"));
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
var yamljs_1 = __importDefault(require("yamljs"));
var app = (0, express_1.default)();
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static('public'));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)(storeOptions_1.storeOptions));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/", index_1.default);
// HBS PART:
app.set('view engine', 'hbs');
app.set('views', paths_1.viewPath);
app.engine('hbs', (0, express_handlebars_1.engine)(paths_1.paths));
var swaggerPath = path_1.default.resolve(process.cwd(), './swagger.yml');
var swaggerDoc = yamljs_1.default.load(swaggerPath);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDoc));
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
