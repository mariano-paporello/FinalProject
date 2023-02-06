"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var logIn_1 = require("../../Controllers/login-Register-logOut/logIn");
var logInRoute = (0, express_1.Router)();
logInRoute.post('/', logIn_1.logIn);
logInRoute.get('/', logIn_1.logInGet);
exports.default = logInRoute;
