"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeOptions = void 0;
var connect_mongo_1 = __importDefault(require("connect-mongo"));
var index_1 = __importDefault(require("../config/index"));
var unSegundo = 1000;
var unMinuto = unSegundo * 60;
var unaHora = unMinuto * 60;
exports.storeOptions = {
    store: connect_mongo_1.default.create({
        mongoUrl: index_1.default.MONGO_ATLAS_URL,
        crypto: {
            secret: index_1.default.CRYPTO_SECRET
        }
    }),
    secret: index_1.default.SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: unaHora
    }
};
