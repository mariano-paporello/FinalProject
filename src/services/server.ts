import express from 'express'
import http from 'http'
import {
    engine
} from 'express-handlebars'
import compression from "compression"
import rutaTest from "../routes/index"
import path from 'path'
import ProductoModel from '../models/products'
import menssagesModel from '../models/messages'
import cookieParser from "cookie-parser"
import session from 'express-session';
import os from "os"
import MongoStore from 'connect-mongo'
import config from '../config/index'
import passport from "passport"
import {logger }from "../middlewares/loggers"
import {
    loginFunc,
    signUpFunc,
    generateAuthToken
} from './auth'
import minimist from 'minimist'

const args = minimist(process.argv)
declare module 'express-session' {
    interface SessionData {
        gmail: String,
        username: String,
        contraseña: any
    }
}


const app = express()
app.use("/api", rutaTest)

app.use(compression())

// Session Part:
export const logged = {
    islogged: false,
    isDestroyed: false,
    nombre: '',
    contraseña: false
}

    const unSegundo = 1000;
    const unMinuto = unSegundo * 60;
    const unaHora = unMinuto * 60;
    const unDia = unaHora * 24;
    const storeOptions = {
        store: MongoStore.create({
            mongoUrl: config.MONGO_ATLAS_URL,
            crypto: {
                secret: config.CRYPTO_SECRET
            }
        }),
        secret: config.SECRET,
        resave: false,
        saveUninitialized: false,
        rolling: true,
        cookie: {
            maxAge: unMinuto
        }
    };

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
    const viewPath = path.resolve(__dirname, '../../views')
    const layoutsPath = `${viewPath}/layouts`
    const partialsPath = `${viewPath}/partials`
    const defaultLayoutPath = `${layoutsPath}/index.hbs`;
    app.set('view engine', 'hbs')
    app.set('views', viewPath)

    app.engine('hbs', engine({
        layoutsDir: layoutsPath,
        extname: 'hbs',
        partialsDir: partialsPath,
        defaultLayout: defaultLayoutPath
    }))


    
    

    app.get('/', async (req, res) => {
        logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
        if (req.session.gmail && logged.islogged && !logged.isDestroyed) {
            +
            ProductoModel.find({}).then(productos => {
                menssagesModel.find({}).then(mensajes => {
                    res.render('main', {
                        productos: productos.map(productoIndv => productoIndv.toJSON()),
                        mensajes: mensajes.map(mensajeIndv => mensajeIndv.toJSON()),
                        user: req.session.username
                    })
                })
            })
        } else {
            res.redirect("/register")
        }
    })
    app.post('/login', async (req, res, next) => {
        logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
        passport.authenticate('login', {}, async (err, user, info) => {
            const data = req.body
            if (user.gmail && user.password) {
                const token = generateAuthToken(user)
                logged.nombre = user.username
                logged.contraseña = true
                logged.islogged = true
                res.header('x-login-token', token).redirect("/")
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
            res.header('x-login-token', token).redirect("/")
        })(req, res, next)
    })

    app.get('/login', (req, res) => {
        logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
        logged.isDestroyed = false
        res.render("Login")
    })

    app.get('/register', (req, res) => {
        logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
        res.render("register")
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
            setTimeout(() => {
                req.session.destroy((err) => {
                    logger.error(err)
                });
            }, unMinuto)

        } else {
            res.redirect("/")
        }
    })

    app.get("/info", (req, res) => {
        logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
        res.json({
            "Directorio actual de trabajo": process.cwd(),
            "id ID Del proceso actual": process.pid,
            "Version de NodeJs corriendo": process.version,
            "Titulo del proceso": process.title,
            "Sistema Operativo": process.platform,   
            "Uso de memoria": JSON.stringify(process.memoryUsage()),
            "Cantidad de procesadores": os.cpus().length,
            "port": args.port
        })

    })

    app.get('*', (req, res)=>{
        logger.warn( "METODO:"+req.method + " RUTA:"+ req.url )
        res.status(404).json({Error:"Inexistent route"})
    })


    const HTTPServer = new http.Server(app);

    module.exports = HTTPServer
