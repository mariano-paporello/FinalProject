import passport from "passport"
import { logger } from "../utils/loggers"
import { generateToken } from "./user"
import { logged } from "../utils/logged"



// LOGIN LOGIC
export const logIn =  async (req, res, next) => {
    passport.authenticate('login', {}, async (err, user, info) => {
    logger.info( "METODO:"+ req.method + " RUTA:"+ req.url )
    if (user.gmail && user.id) {
        logged.nombre = user.username
        logged.contraseña = true
        logged.islogged = true
        logged.isDestroyed= false
        const token = await generateToken(user)
        res.header('Access-Control-Expose-Headers', 'x-auth-token').header('x-auth-token', token).status(200).json({
                msg: 'login OK',
                header: await req.headers['x-auth-token']
         })  
        } else {
            logger.error("Datos ingresados no validos o nulos")
            res.status(400).json({
                Error: "Datos ingresados no validos o nulos."
            })
        }
    })(req, res, next)
}
export const logInGet = (req, res)=>{
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    logged.isDestroyed = false
    res.json({msg:"Estas en logIn"})
}

// REGISTER LOGIC
export const register = async (req, res, next) => {
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
        const token = generateToken(user)
        logged.nombre = username
        logged.contraseña = true
        logged.islogged = true
        logged.isDestroyed= false
        res.header('x-auth-token', token).json({
            msg: "User creado: ",
            user
        });
    })(req, res, next);
}

export const registerGet = (req, res) => {
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    logged.isDestroyed = false
    res.json({msg:"Estas en la Ruta register"})
}

// LOGOUT LOGIC

export const logout = (req, res) => {
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    if (req.session.username) {
        res.json({
            logoutFromThisUser: req.session.username
        })
        logged.islogged = false
        logged.nombre = ""
        logged.isDestroyed = true

    } else {
        res.json({err: "No hay data del usuario"})
    }
}

// Auth middlewares

export const isLogged = (req, res, next)=>{
if(logged&& logged.islogged){
next()
}
else{
    logger.error("METODO:"+req.method + " RUTA:"+ req.url);
    
    res.status(400).json({
        Error: "Not Logged"
    })
}
}
 export const loggedIsNotDestroyed =(req, res, next)=>{
    if(logged && !logged.isDestroyed){
        next()
    }else{
        logger.error("METODO:"+req.method + " RUTA:"+ req.url);
        res.status(400).json({
            Error: "Session destroyed"
        })
    }
 }