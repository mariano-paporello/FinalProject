"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var productsController_1 = require("../../Controllers/msgAndProd/productsController");
var LoggedVerification_1 = require("../../middlewares/LoggedVerification");
var productsRoute = (0, express_1.Router)();
productsRoute.get("/", LoggedVerification_1.isLogged, LoggedVerification_1.loggedIsNotDestroyed, productsController_1.productsController);
productsRoute.post("/:id", LoggedVerification_1.isLogged, LoggedVerification_1.loggedIsNotDestroyed, productsController_1.productToCart);
exports.default = productsRoute;
