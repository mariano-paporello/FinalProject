"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsMutations = exports.ProductsQueries = void 0;
var products_repository_1 = require("../../models/products/products.repository");
exports.ProductsQueries = {
    getAllProd: products_repository_1.repositoryProduct.getAllProd,
    getProductById: products_repository_1.repositoryProduct.getProductById,
    getProductByQuery: products_repository_1.repositoryProduct.getProductByQuery
};
exports.ProductsMutations = {
    postProductToProducts: products_repository_1.repositoryProduct.postProductToProducts,
    deleteAll: products_repository_1.repositoryProduct.deleteAll,
    deleteByQuery: products_repository_1.repositoryProduct.deleteByQuery,
};
