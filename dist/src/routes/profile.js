"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var auth_1 = require("../controller/auth");
var profile_1 = require("../controller/profile");
var ProfileRoute = (0, express_1.Router)();
ProfileRoute.get("/", auth_1.isLogged, auth_1.loggedIsNotDestroyed, profile_1.profileGet);
exports.default = ProfileRoute;
