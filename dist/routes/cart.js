"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../controller/auth");
var cart_1 = require("../controller/cart");
var cartRoute = (0, express_1.Router)();
cartRoute.get("/", auth_1.isLogged, auth_1.loggedIsNotDestroyed, cart_1.cart);
cartRoute.post("/", auth_1.isLogged, auth_1.loggedIsNotDestroyed, cart_1.cartSender);
exports.default = cartRoute;
