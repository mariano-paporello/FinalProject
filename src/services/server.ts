import express from 'express'
import http from 'http'
import path from "path"
import {engine} from 'express-handlebars'
import compression from "compression"
import {logger}from "../utils/loggers"
import index from '../routes/index'
import { paths, viewPath } from '../utils/paths'
import cookieParser from "cookie-parser";
import session from 'express-session';
import { storeOptions } from "../api/storeOptions";
import passport from "passport";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { User } from '../../Public/types'

declare module 'express-session' {
    interface SessionData {
        dataUser: User
        gmail: String,
        contraseña: String,
        admin: Boolean
    }
}

const app = express()

app.use(compression())
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static('Public'))
app.use(cookieParser());
app.use(session(storeOptions));
app.use(passport.initialize());
app.use(passport.session());
app.use("/", index)
// HBS PART:
app.set('view engine', 'hbs')
app.set('views', viewPath)
app.engine('hbs', engine(paths))

const swaggerPath = path.resolve(process.cwd(), './swagger.yml');
const swaggerDoc = YAML.load(swaggerPath)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc))


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

