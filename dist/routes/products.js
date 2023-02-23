"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../controller/auth");
var products_1 = require("../controller/products");
var productsRoute = (0, express_1.Router)();
productsRoute.get("/", auth_1.loggedIsNotDestroyed, products_1.productsController);
productsRoute.post("/:id", auth_1.loggedIsNotDestroyed, products_1.productToCart);
exports.default = productsRoute;
