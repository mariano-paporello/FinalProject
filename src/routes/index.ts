import {Router} from "express"
import {logger} from "../utils/loggers"
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
import { logged } from "../utils/logged";
import productsRoute from "./cartAndProd/products";
import { logout } from "../Controllers/logout";
import { logIn } from "../Controllers/loginAndRegister/logIn";
import { register } from "../Controllers/loginAndRegister/register";
import cors from "cors"
import cartRoute from "./cartAndProd/cart";


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

mainRoute.use(cors());

mainRoute.post('/login', logIn)

mainRoute.post('/register', register)


//GET VIEWS 

mainRoute.get("/logout", logout)

mainRoute.get('/' ,isLogged, loggedIsNotDestroyed,homeview)

//!DEBUGUEAR mainRoute.get('/isauth', checkAuth, (req, res) => {
//     res.json({ msg: "estoy en isauth"})
// })


    

mainRoute.get('/login', (req, res) => {
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    logged.isDestroyed = false
    res.render("Login")
})

mainRoute.get('/register', (req, res) => {
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    res.render("register")
})




export default mainRoute;