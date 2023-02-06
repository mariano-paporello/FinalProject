"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var cart_1 = require("../../Controllers/cart-profile/cart");
var LoggedVerification_1 = require("../../middlewares/LoggedVerification");
var cartRoute = (0, express_1.Router)();
cartRoute.get("/", LoggedVerification_1.isLogged, LoggedVerification_1.loggedIsNotDestroyed, cart_1.cart);
cartRoute.post("/", LoggedVerification_1.isLogged, LoggedVerification_1.loggedIsNotDestroyed, cart_1.cartSender);
exports.default = cartRoute;
