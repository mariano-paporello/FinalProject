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
exports.productsMutations = exports.productsQuerys = exports.repositoryProduct = void 0;
// import { asDto } from "./dto/products-dto";
var graphql_compose_1 = require("graphql-compose");
var products_factory_1 = require("./products.factory");
var ProductsRepository = /** @class */ (function () {
    function ProductsRepository() {
        this.dao = (0, products_factory_1.getDao)();
    }
    ProductsRepository.prototype.getAllProd = function () {
        return __awaiter(this, void 0, void 0, function () {
            var products, productsDto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getAllProd()];
                    case 1:
                        products = _a.sent();
                        productsDto = (products);
                        return [2 /*return*/, productsDto];
                }
            });
        });
    };
    ;
    ProductsRepository.prototype.getProductById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var products, productsDto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getProductById(id)];
                    case 1:
                        products = _a.sent();
                        productsDto = (products);
                        return [2 /*return*/, productsDto];
                }
            });
        });
    };
    ;
    ProductsRepository.prototype.getProductByQuery = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var products, productsDto;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.getProductByQuery(query)];
                    case 1:
                        products = _a.sent();
                        productsDto = (products);
                        return [2 /*return*/, productsDto];
                }
            });
        });
    };
    ;
    ProductsRepository.prototype.postProductToProducts = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.postProductToProducts(data)];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, products];
                }
            });
        });
    };
    ProductsRepository.prototype.deleteAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.deleteAll()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    ProductsRepository.prototype.deleteByQuery = function (query) {
        return __awaiter(this, void 0, void 0, function () {
            var productDeleted;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.deleteByQuery(query)];
                    case 1:
                        productDeleted = _a.sent();
                        return [2 /*return*/, productDeleted];
                }
            });
        });
    };
    // GRAPHQL
    ProductsRepository.prototype.postProductToProductsGraphql = function (title, price, thumbnail, category, stock) {
        return __awaiter(this, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dao.postProductToProductsGraphql({ title: title, price: price, thumbnail: thumbnail, category: category, stock: stock })];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, products];
                }
            });
        });
    };
    return ProductsRepository;
}());
exports.repositoryProduct = new ProductsRepository();
var ProductTC = graphql_compose_1.schemaComposer.createObjectTC({
    name: 'ProductObject',
    fields: {
        _id: "String!",
        id: "String",
        title: "String",
        price: "Int",
        thumbnail: "String",
        category: "String",
        stock: "Int",
    },
});
var ProductInCartInputTC = graphql_compose_1.schemaComposer.createInputTC({
    name: "ProductInCartObjectInput",
    fields: {
        _id: "String",
        amount: "Int",
        productId: "String"
    }
});
exports.productsQuerys = {
    getAllProd: {
        type: '[ProductObject]',
        resolve: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.repositoryProduct.getAllProd()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); },
    },
    getProductById: {
        type: 'ProductObject',
        args: { id: 'String!' },
        resolve: function (_, id) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.repositoryProduct.getProductById(id)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); },
    },
    getProductByTitle: {
        type: "ProductObject",
        args: {
            titleProd: "String"
        },
        resolve: function (_, titleProd) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.repositoryProduct.getProductByQuery({ title: titleProd })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); }
    }
};
exports.productsMutations = {
    postProductToProducts: {
        type: 'ProductObject',
        args: {
            title: "String!",
            price: "Int",
            thumbnail: "String",
            category: "String",
            stock: "Int",
        },
        resolve: function (_, title, price, thumbnail, category, stock) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.repositoryProduct.postProductToProductsGraphql(title, price, thumbnail, category, stock)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); },
    },
    deleteById: {
        type: 'DeleteResult',
        args: {
            id: "String"
        },
        resolve: function (_, id) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.repositoryProduct.deleteByQuery({ _id: id })];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); }
    },
    deleteAll: {
        type: "Boolean",
        resolve: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, exports.repositoryProduct.deleteAll];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); }
    }
};
