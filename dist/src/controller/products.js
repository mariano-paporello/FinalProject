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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAProduct = exports.modifyAProduct = exports.newProductController = exports.productsGetController = void 0;
var products_1 = require("../api/products");
var loggers_1 = require("../utils/loggers");
var productsGetController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productoBuscado, productosBuscados, _a, _b, err_1;
    var _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _d.trys.push([0, 7, , 8]);
                if (!(req.params.id && req.params.id.length > 1)) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, products_1.getProducts)(req.params.id)];
            case 1:
                productoBuscado = _d.sent();
                if (productoBuscado !== null && productoBuscado) {
                    res.json({
                        productoBuscado: productoBuscado,
                    });
                }
                else if (!productoBuscado) {
                    res.status(400).json({
                        Error: "The ID received is incorrect (it needs to have 24 characters) or doesn´t exist.",
                    });
                }
                else {
                    loggers_1.logger.warning("EL ID DEL PRODUCTO BUSCADO NO EXISTE");
                    res.status(400).json({
                        Error: "The ID of the product wasn't found.",
                    });
                }
                return [3 /*break*/, 6];
            case 2:
                if (!req.params.category) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, products_1.getProducts)(undefined, req.params.category)];
            case 3:
                productosBuscados = _d.sent();
                if (productosBuscados &&
                    Array.isArray(productosBuscados) &&
                    productosBuscados.length >= 1) {
                    res.json({
                        productosBuscados: productosBuscados,
                    });
                }
                else {
                    res.status(400).json({
                        Error: "It couldn't find any products with that category.",
                    });
                }
                return [3 /*break*/, 6];
            case 4:
                _b = (_a = res.status(200)).json;
                _c = {};
                return [4 /*yield*/, (0, products_1.getProducts)()];
            case 5:
                _b.apply(_a, [(_c.productos = _d.sent(),
                        _c)]);
                _d.label = 6;
            case 6: return [3 /*break*/, 8];
            case 7:
                err_1 = _d.sent();
                loggers_1.logger.error("Error in productsController: ", err_1);
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.productsGetController = productsGetController;
var newProductController = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productCreated, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                if (!req.session.admin) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, products_1.newProductToDB)(req.body)];
            case 1:
                productCreated = _a.sent();
                res.status(200).json({
                    productoCreado: productCreated,
                });
                return [3 /*break*/, 3];
            case 2:
                res.status(404).json({
                    Error: "User isn't admin",
                });
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                loggers_1.logger.error("Error in productsController: ".concat(error_1));
                res.json({
                    error: error_1,
                });
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.newProductController = newProductController;
var modifyAProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, data, changedProduct;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                data = req.body;
                return [4 /*yield*/, (0, products_1.updateProduct)({ _id: id }, { $set: data })];
            case 1:
                changedProduct = _a.sent();
                if (changedProduct.acknowledged && changedProduct.modifiedCount > 0) {
                    res.status(200).json({
                        msg: "Modification  done to product with ID: ".concat(id),
                    });
                }
                else {
                    res.status(400).json({
                        Error: "Modification failed",
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.modifyAProduct = modifyAProduct;
var deleteAProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deleteResult;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                return [4 /*yield*/, (0, products_1.deleteProduct)(id)];
            case 1:
                deleteResult = _a.sent();
                if (id.length !== 24)
                    res.status(400).json({
                        error: "Error when trying to delete the product with ID: ".concat(id, ". Because the id hasn't got 24 caracters.")
                    });
                if (deleteResult &&
                    deleteResult.acknowledged &&
                    deleteResult.deletedCount > 0) {
                    res.status(200).json({
                        msg: "Product with ID: ".concat(id, ". Was deleted"),
                    });
                }
                else {
                    loggers_1.logger.error("It wasn't possible to delete the product because the ID was entered wrong");
                    res.status(400).json({
                        error: "Error when trying to delete the product with ID: ".concat(id, ". It doesn't exist."),
                    });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.deleteAProduct = deleteAProduct;
