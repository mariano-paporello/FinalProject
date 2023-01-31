"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loggedIsNotDestroyed = exports.isLogged = void 0;
var mainRoute_1 = require("../routes/mainRoute");
var isLogged = function (req, res, next) {
    if (mainRoute_1.logged && mainRoute_1.logged.islogged) {
        next();
    }
    else {
        res.redirect("/register");
        // res.status(400).json({
        //     Error: "Not Logged"
        // })
    }
};
exports.isLogged = isLogged;
var loggedIsNotDestroyed = function (req, res, next) {
    if (mainRoute_1.logged && !mainRoute_1.logged.isDestroyed) {
        next();
    }
    else {
        res.status(400).json({
            Error: "Session is destroyed"
        });
    }
};
exports.loggedIsNotDestroyed = loggedIsNotDestroyed;
