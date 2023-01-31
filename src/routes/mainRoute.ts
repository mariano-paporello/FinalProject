import { Router } from "express";
import { homeview } from "../Controllers/viewController";
import { logger } from "../middlewares/loggers";
import path from 'path'
import { isLogged, loggedIsNotDestroyed } from "../middlewares/LoggedVerification";
import session from 'express-session';
import { usuario } from '../models/user'
import { storeOptions } from "../api/storeOptions";
import cookieParser from "cookie-parser";

declare module 'express-session' {
    interface SessionData {
        dataUser: usuario
        gmail: String,
        username: String,
        contraseña: any
    }
}
export const viewPath = path.resolve(__dirname, '../../views')
const layoutsPath = `${viewPath}/layouts`
const partialsPath = `${viewPath}/partials`
const defaultLayoutPath = `${layoutsPath}/index.hbs`;

export const paths= {
        layoutsDir: layoutsPath,
        extname: 'hbs',
        partialsDir: partialsPath,
        defaultLayout: defaultLayoutPath
    }

const mainRoute:Router = Router()

mainRoute.use(cookieParser());
mainRoute.use(session(storeOptions));

export const logged = {
    islogged: false,
    isDestroyed: false,
    nombre: '',
    contraseña: false,
}


mainRoute.get('/' ,isLogged, loggedIsNotDestroyed ,async (req, res) => {
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url ) 
    homeview(req,res)
})

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

mainRoute.get("/profile",isLogged, loggedIsNotDestroyed, (req, res)=>{
    if (req.session.gmail && logged.islogged && !logged.isDestroyed) {
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    
    res.render("profile",{
        data: req.session.dataUser
    })
    }else{
        logger.error("METODO:"+req.method + " RUTA:"+ req.url);
        res.status(404).redirect("register")
    }   
})

export default mainRoute