"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var profile_1 = require("../../Controllers/cart-profile/profile");
var LoggedVerification_1 = require("../../middlewares/LoggedVerification");
var ProfileRoute = (0, express_1.Router)();
ProfileRoute.get("/", LoggedVerification_1.isLogged, LoggedVerification_1.loggedIsNotDestroyed, profile_1.profileGet);
exports.default = ProfileRoute;
