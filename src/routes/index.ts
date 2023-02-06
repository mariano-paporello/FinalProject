import {Router} from "express"
import otherRoute from "./otherRoutes/otherRoute";
import profileRoute from "./profileAndChat/profile"
import { usuario } from "../models/user";
import { homeview } from "../Controllers/viewController";
import { isLogged, loggedIsNotDestroyed } from "../middlewares/LoggedVerification";
import passport from "passport";
import { loginFunc, signUpFunc, validateToken  } from "../services/auth";
import cookieParser from "cookie-parser";
import express from "express";
import session from 'express-session';
import { storeOptions } from "../api/storeOptions";
import productsRoute from "./cartAndProd/products";
import cors from "cors"
import cartRoute from "./cartAndProd/cart";
import logInRoute from "./logIn-register-logOut/logIn";
import registerRoute from "./logIn-register-logOut/register";
import logOutRoute from "./logIn-register-logOut/logOut";

declare module 'express-session' {
    interface SessionData {
        dataUser: usuario
        gmail: String,
        username: String,
        contraseña: any
    }
}
const mainRoute: Router = Router();

mainRoute.use(express.json())
mainRoute.use(express.urlencoded({extended: true}));
mainRoute.use(express.static('public'))
mainRoute.use(cookieParser());
mainRoute.use(session(storeOptions));
mainRoute.use(passport.initialize());
mainRoute.use(passport.session());
passport.use('login', loginFunc);
passport.use('signup', signUpFunc);
mainRoute.use("/other",otherRoute)
mainRoute.use("/profile", profileRoute)
mainRoute.use("/products", productsRoute)
mainRoute.use("/cart", cartRoute)
mainRoute.use("/login", logInRoute)
mainRoute.use("/register", registerRoute)
mainRoute.use("/logout", logOutRoute)
mainRoute.use(cors());

mainRoute.get('/', homeview)

export default mainRoute;