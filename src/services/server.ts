import express from 'express'
import http from 'http'
import {
    engine
} from 'express-handlebars'
import compression from "compression"
import sideRoute from "../routes/index"
import cookieParser from "cookie-parser"
import session from 'express-session';
import passport from "passport"
import {logger }from "../middlewares/loggers"
import {
    loginFunc,
    signUpFunc,
    generateAuthToken,
    checkAuth
} from '../Controllers/auth'
import { usuario } from '../models/user'
import mainRoute, { logged, paths, viewPath } from '../routes/mainRoute'
import { storeOptions } from '../api/storeOptions'

declare module 'express-session' {
    interface SessionData {
        dataUser: usuario
        gmail: String,
        username: String,
        contraseña: any
    }
}

const app = express()
app.use("/api", sideRoute)
app.use("/",mainRoute)
app.use(compression())

// Session Part:

    app.use(express.json())
    app.use(express.urlencoded({
        extended: true
    }));
    app.use(express.static('public'))

    app.use(cookieParser());
    app.use(session(storeOptions));
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use('login', loginFunc);
    passport.use('signup', signUpFunc);

    // HBS PART:
    
    app.set('view engine', 'hbs')
    app.set('views', viewPath)

    app.engine('hbs', engine(paths))
    
    app.post('/login', async (req, res, next) => {
        // remplazar con una ruta
        logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
        passport.authenticate('login', {}, async (err, user, info) => {
            console.log("DataUser: ",req.session.dataUser)
            if (user.gmail && user.password) {
                
                logged.nombre = user.username
                logged.contraseña = true
                logged.islogged = true

                const token = generateAuthToken(user)
                console.log("El Token: ", token)
                res.setHeader('x-auth-token', token).redirect("/")
            } else {
                res.status(400).json({
                    Error: "Datos ingresados no validos o nulos."
                })
            }
        })(req, res, next)
    })

    app.post('/register', async (req, res, next) => {
        logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
        passport.authenticate('signup', {}, (err, user, info) => {
            const {
                gmail,
                username,
                age, 
                phoneNumber,
                image,
                password
            } = req.body
           

            if (!username || !gmail || !age || !phoneNumber || !image || !password) {
                res.status(400).json({
                    Error: "Datos ingresados no validos o nulos"
                })
            }
            const token = generateAuthToken(user)
            logged.nombre = username
            
            logged.contraseña = true
            logged.islogged = true
            console.log(user)
            res.header('x-auth-token', token).redirect("/")
        })(req, res, next)
    })

    app.get("/logout", (req, res) => {
        logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
        if (req.session.username) {
            res.render("Logout", {
                user: req.session.username
            })
            logged.islogged = false
            logged.nombre = ""
            logged.isDestroyed = true

        } else {
            res.redirect("/")
        }
    })

    // VIEW DISPLAYS:

    app.get('*', (req, res)=>{
        logger.warn( "METODO:"+req.method + " RUTA:"+ req.url )
        res.status(404).json({Error:"Inexistent route"})
    })


    const HTTPServer = new http.Server(app);

    module.exports = HTTPServer
