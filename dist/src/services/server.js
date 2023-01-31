"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var express_handlebars_1 = require("express-handlebars");
var compression_1 = __importDefault(require("compression"));
var index_1 = __importDefault(require("../routes/index"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var express_session_1 = __importDefault(require("express-session"));
var passport_1 = __importDefault(require("passport"));
var loggers_1 = require("../middlewares/loggers");
var auth_1 = require("../Controllers/auth");
var mainRoute_1 = __importStar(require("../routes/mainRoute"));
var storeOptions_1 = require("../api/storeOptions");
var app = (0, express_1.default)();
app.use("/api", index_1.default);
app.use("/", mainRoute_1.default);
app.use((0, compression_1.default)());
// Session Part:
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({
    extended: true
}));
app.use(express_1.default.static('public'));
app.use((0, cookie_parser_1.default)());
app.use((0, express_session_1.default)(storeOptions_1.storeOptions));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
passport_1.default.use('login', auth_1.loginFunc);
passport_1.default.use('signup', auth_1.signUpFunc);
// HBS PART:
app.set('view engine', 'hbs');
app.set('views', mainRoute_1.viewPath);
app.engine('hbs', (0, express_handlebars_1.engine)(mainRoute_1.paths));
app.post('/login', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        // remplazar con una ruta
        loggers_1.logger.info("METODO:" + req.method + " RUTA:" + req.url);
        passport_1.default.authenticate('login', {}, function (err, user, info) { return __awaiter(void 0, void 0, void 0, function () {
            var token;
            return __generator(this, function (_a) {
                console.log("DataUser: ", req.session.dataUser);
                if (user.gmail && user.password) {
                    mainRoute_1.logged.nombre = user.username;
                    mainRoute_1.logged.contraseña = true;
                    mainRoute_1.logged.islogged = true;
                    token = (0, auth_1.generateAuthToken)(user);
                    console.log("El Token: ", token);
                    res.setHeader('x-auth-token', token).redirect("/");
                }
                else {
                    res.status(400).json({
                        Error: "Datos ingresados no validos o nulos."
                    });
                }
                return [2 /*return*/];
            });
        }); })(req, res, next);
        return [2 /*return*/];
    });
}); });
app.post('/register', function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        loggers_1.logger.info("METODO:" + req.method + " RUTA:" + req.url);
        passport_1.default.authenticate('signup', {}, function (err, user, info) {
            var _a = req.body, gmail = _a.gmail, username = _a.username, age = _a.age, phoneNumber = _a.phoneNumber, image = _a.image, password = _a.password;
            if (!username || !gmail || !age || !phoneNumber || !image || !password) {
                res.status(400).json({
                    Error: "Datos ingresados no validos o nulos"
                });
            }
            var token = (0, auth_1.generateAuthToken)(user);
            mainRoute_1.logged.nombre = username;
            mainRoute_1.logged.contraseña = true;
            mainRoute_1.logged.islogged = true;
            console.log(user);
            res.header('x-auth-token', token).redirect("/");
        })(req, res, next);
        return [2 /*return*/];
    });
}); });
app.get("/logout", function (req, res) {
    loggers_1.logger.info("METODO:" + req.method + " RUTA:" + req.url);
    if (req.session.username) {
        res.render("Logout", {
            user: req.session.username
        });
        mainRoute_1.logged.islogged = false;
        mainRoute_1.logged.nombre = "";
        mainRoute_1.logged.isDestroyed = true;
    }
    else {
        res.redirect("/");
    }
});
// VIEW DISPLAYS:
app.get('*', function (req, res) {
    loggers_1.logger.warn("METODO:" + req.method + " RUTA:" + req.url);
    res.status(404).json({ Error: "Inexistent route" });
});
var HTTPServer = new http_1.default.Server(app);
module.exports = HTTPServer;
