"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var logout_1 = require("../../Controllers/login-Register-logOut/logout");
var logOutRoute = (0, express_1.Router)();
logOutRoute.get("/", logout_1.logout);
exports.default = logOutRoute;
