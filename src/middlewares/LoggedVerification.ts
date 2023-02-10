
import { logged } from "../utils/logged";
import { logger } from "../utils/loggers"

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
//  mover a auth controller donde va a estar login y register