import express from 'express'
import http from 'http'
import {engine} from 'express-handlebars'
import compression from "compression"
import {logger }from "../utils/loggers"
// import { usuario } from '../persistence/user'
import index from '../routes/index'
import { paths, viewPath } from '../utils/paths'
import cookieParser from "cookie-parser";
import session from 'express-session';
import { storeOptions } from "../api/storeOptions";
import passport from "passport";

declare module 'express-session' {
    interface SessionData {
        dataUser: any
        gmail: String,
        username: String,
        contraseña: any
    }
}

const app = express()

app.use(compression())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'))
app.use(cookieParser());
app.use(session(storeOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", index)
// HBS PART:
app.set('view engine', 'hbs')
app.set('views', viewPath)
app.engine('hbs', engine(paths))

app.get('*', (req, res)=>{
    logger.warn( "METODO:"+req.method + " RUTA:"+ req.url )
    res.status(404).json({Error:"Inexistent route"})
})
app.post('*', (req, res)=>{
    logger.warn( "METODO:"+req.method + " RUTA:"+ req.url )
    res.status(404).json({Error:"Inexistent route"})
})

const HTTPServer = new http.Server(app);

module.exports = HTTPServer
