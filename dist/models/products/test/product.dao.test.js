"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
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
var mongoose_1 = __importDefault(require("mongoose"));
var products_factory_1 = require("../products.factory");
var products_repository_1 = require("../products.repository");
describe("Product Test", function () {
    var daoTest;
    beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    jest.spyOn(mongoose_1.default, "connect").mockResolvedValue(mongoose_1.default);
                    return [4 /*yield*/, (0, products_factory_1.getDao)()];
                case 1:
                    daoTest = _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    describe("productDao getAll", function () {
        it('deberia traer un array vacio si no hay elementos en la db', function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockResponse, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockResponse = [];
                        jest.spyOn(products_repository_1.repositoryProduct, "getAllProd").mockResolvedValueOnce(mockResponse);
                        return [4 /*yield*/, daoTest.getAllProd()];
                    case 1:
                        data = _a.sent();
                        expect(data).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("producDao get by Query", function () {
        it("deberia traer el objeto que quiero por el query", function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockResponse, data;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockResponse = { "_id": "61994f4a02cb778668c50409", "title": "boca", "price": 300, "thumbnail": "notFound", "category": "the best", "stock": 1 };
                        jest.spyOn(products_repository_1.repositoryProduct, 'getProductByQuery').mockResolvedValue(mockResponse);
                        return [4 /*yield*/, daoTest.getProductByQuery({ title: mockResponse.title })];
                    case 1:
                        data = _a.sent();
                        expect(data.title).toEqual(mockResponse.title);
                        expect(data.price).toEqual(mockResponse.price);
                        expect(data.thumbnail).toEqual(mockResponse.thumbnail);
                        expect(data.category).toEqual(mockResponse.category);
                        expect(data.stock).toEqual(mockResponse.stock);
                        expect(data._id).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("ProductDao post", function () {
        it("deberia guardar correctamente el nuevo producto", function () { return __awaiter(void 0, void 0, void 0, function () {
            var newProduct, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newProduct = {
                            title: "NuevoProducto",
                            price: 300,
                            thumbnail: "notFound",
                            category: "the best",
                            stock: 1
                        };
                        jest.spyOn(products_repository_1.repositoryProduct, "postProductToProducts").mockImplementation(function () {
                            return Promise.resolve(__assign({ _id: '61994f4a02cb778668c50409' }, newProduct));
                        });
                        return [4 /*yield*/, daoTest.postProductToProducts(newProduct)];
                    case 1:
                        result = _a.sent();
                        expect(result.title).toEqual(newProduct.title);
                        expect(result.price).toEqual(newProduct.price);
                        expect(result.thumbnail).toEqual(newProduct.thumbnail);
                        expect(result.category).toEqual(newProduct.category);
                        expect(result.stock).toEqual(newProduct.stock);
                        expect(result._id).toBeDefined();
                        return [2 /*return*/];
                }
            });
        }); });
    });
    describe("ProductDao delete", function () {
        it("deberia eliminar correcamente el producto por query", function () { return __awaiter(void 0, void 0, void 0, function () {
            var mockResponse, deleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        mockResponse = { acknowledged: true, deletedCount: 1 };
                        jest.spyOn(products_repository_1.repositoryProduct, "deleteByQuery").mockResolvedValue(mockResponse);
                        return [4 /*yield*/, daoTest.deleteByQuery({ title: "NuevoProducto" })];
                    case 1:
                        deleted = _a.sent();
                        expect(deleted.deletedCount).toEqual(mockResponse.deletedCount);
                        expect(deleted.acknowledged).toEqual(mockResponse.acknowledged);
                        return [2 /*return*/];
                }
            });
        }); });
    });
});
