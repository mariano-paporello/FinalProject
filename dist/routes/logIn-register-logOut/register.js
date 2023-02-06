"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var register_1 = require("../../Controllers/login-Register-logOut/register");
var registerRoute = (0, express_1.Router)();
registerRoute.post('/', register_1.register);
registerRoute.get('/', register_1.registerGet);
exports.default = registerRoute;
