import express from 'express'
import http from 'http'
import {engine} from 'express-handlebars'
import compression from "compression"
import {logger }from "../utils/loggers"
import { usuario } from '../models/user'
import index from '../routes/index'
import { paths, viewPath } from '../utils/paths'
import helmet from 'helmet'

declare module 'express-session' {
    interface SessionData {
        dataUser: usuario
        gmail: String,
        username: String,
        contraseña: any
    }
}

const app = express()
app.use("/api", index)
app.use(compression())
app.use(helmet())
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
