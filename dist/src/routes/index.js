"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var normalizeController_1 = require("../Controllers/normalizeController");
var testController_1 = require("../Controllers/testController");
var child_process_1 = require("child_process");
var loggers_1 = require("../middlewares/loggers");
var os_1 = __importDefault(require("os"));
var minimist_1 = __importDefault(require("minimist"));
var path_1 = __importDefault(require("path"));
var sideRoute = (0, express_1.Router)();
var controllerPath = path_1.default.resolve(__dirname, '../Controllers/randomsController.ts');
var args = (0, minimist_1.default)(process.argv);
sideRoute.get("/normalize", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                loggers_1.logger.info("METODO:" + req.method + " RUTA:" + req.url);
                _b = (_a = res).json;
                return [4 /*yield*/, (0, normalizeController_1.getAllNorm)()];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
sideRoute.get("/denormalize", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                loggers_1.logger.info("METODO:" + req.method + " RUTA:" + req.url);
                _b = (_a = res).json;
                return [4 /*yield*/, (0, normalizeController_1.getAllDenorm)()];
            case 1:
                _b.apply(_a, [_c.sent()]);
                return [2 /*return*/];
        }
    });
}); });
sideRoute.get("/test-fake-products", function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, _b;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                loggers_1.logger.info("METODO:" + req.method + " RUTA:" + req.url);
                _b = (_a = res).json;
                _c = {};
                return [4 /*yield*/, (0, testController_1.crear5Productos)()];
            case 1:
                _b.apply(_a, [(_c.ProductosFake = _d.sent(), _c)]);
                return [2 /*return*/];
        }
    });
}); });
sideRoute.get("/info", function (req, res) {
    loggers_1.logger.info("METODO:" + req.method + " RUTA:" + req.url);
    res.json({
        "Directorio actual de trabajo": process.cwd(),
        "id ID Del proceso actual": process.pid,
        "Version de NodeJs corriendo": process.version,
        "Titulo del proceso": process.title,
        "Sistema Operativo": process.platform,
        "Uso de memoria": JSON.stringify(process.memoryUsage()),
        "Cantidad de procesadores": os_1.default.cpus().length,
        "port": args.port
    });
});
sideRoute.get("/randoms", function (req, res) {
    loggers_1.logger.info("METODO:" + req.method + " RUTA:" + req.url);
    var cantidad;
    if (req.query.cant) {
        (cantidad = Number(req.query.cant));
    }
    else {
        100000000;
    }
    ;
    var calculo = (0, child_process_1.fork)(controllerPath);
    calculo.send(JSON.stringify({ msg: "start", cantidad: cantidad }));
    calculo.on('message', function (result) {
        res.json({
            Resultado: result
        });
    });
});
exports.default = sideRoute;
