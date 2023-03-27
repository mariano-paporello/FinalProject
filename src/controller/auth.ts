import passport from "passport"
import { logger } from "../utils/loggers"
import { generateToken } from "./user"
import { logged } from "../utils/logged"
import { Response, Request, NextFunction } from "express"
import { User } from "../../Public/types"



// LOGIN LOGIC
export const logIn =  async (req:Request, res:Response, next:NextFunction) => {
    if(req.body.password === req.body.passwordConfirm){
        passport.authenticate('login', {}, async (err:Error, user:User, info:unknown) => {
            logger.info( "METODO:"+ req.method + " RUTA:"+ req.url )
    
            if (user.gmail && user._id) {
            logged.nombre = user.username
            logged.contraseña = true
            logged.islogged = true
            logged.isDestroyed= false
            const token = await generateToken(user)

            res.header("Authorization", `Bearer ${token}`).status(200).json({
                msg: 'login OK',    
                token: token 
            })  
            } else {
                logger.error("Datos ingresados no validos o nulos")
                res.status(400).json({
                    Error: "Datos ingresados no validos o nulos."
                })
            }
        })(req, res, next)
    }else{
        logger.error("Contraseñas ingresadas no son iguales")
        res.status(400).json({
            Error: "Las contraseñas ingresadas no son iguales"
        })
    }
}
export const logInGet = (req:Request, res:Response)=>{
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    logged.isDestroyed = false
    res.json({msg:"Estas en logIn"})
}

// REGISTER LOGIC
export const register = async (req:Request, res:Response, next:NextFunction) => {
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    
    if(req.body.password === req.body.passwordConfirm){
        passport.authenticate('signup', {}, async (err:Error, user:User, info:unknown) => {
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
            const token:string | string[] | undefined = await generateToken(user) 
            
            logged.nombre = username
            logged.contraseña = true
            logged.islogged = true
            logged.isDestroyed= false
            res.header("authorization", `Bearer ${token}`).json({
                token: token
            });
        })(req, res, next);
    }else{
        logger.error("Contraseñas ingresadas no son iguales")
        res.status(400).json({
            Error: "Las contraseñas ingresadas no son iguales"
        })
    }
}

export const registerGet = (req:Request, res:Response) => {
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    logged.isDestroyed = false
    res.json({msg:"Estas en la Ruta register"})
}

// LOGOUT LOGIC

export const logout = (req:Request, res:Response) => {
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    if (req.session.gmail) {
        res.json({
            logoutFromThisUser: req.session.dataUser?.username
        })
        logged.islogged = false
        logged.nombre = ""
        logged.isDestroyed = true

    } else {
        res.json({err: "No hay data del usuario"})
    }
}

// Auth middlewares

export const isLogged = (req:Request, res:Response, next:NextFunction)=>{
if(logged&& logged.islogged){
next()
}
else{
    logger.error("METODO:"+req.method + " RUTA:"+ req.url+ "User is Nos logged");
    
    res.status(400).json({
        Error: "Not Logged"
    })
}
}
 export const loggedIsNotDestroyed =(req:Request, res:Response, next:NextFunction)=>{
    if(logged && !logged.isDestroyed){
        next()
    }else{
        logger.error("METODO:"+req.method + " RUTA:"+ req.url + "Not logged because the session is destroyed");
        res.status(400).json({
            Error: "Session destroyed"
        })
    }
 }
export const isAdmin = (req:Request, res:Response, next: NextFunction)=>{
    if(req.session.admin){
        next()
    }
    else{
        logger.error("METODO:"+req.method + " RUTA:"+ req.url + " User is not type Admin")
        res.status(401).json({
            Error: "Not authorized"
        })
    }
}