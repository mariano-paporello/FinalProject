
import { logged } from "../utils/logged";
import { logger } from "../utils/loggers"

export const isLogged = (req, res, next)=>{
if(logged&& logged.islogged){
next()
}
else{
    logger.error("METODO:"+req.method + " RUTA:"+ req.url);
    res.redirect("/api/register")
    // res.status(400).json({
    //     Error: "Not Logged"
    // })
}
}
 export const loggedIsNotDestroyed =(req, res, next)=>{
    if(logged && !logged.isDestroyed){
        next()
    }else{
        logger.error("METODO:"+req.method + " RUTA:"+ req.url);
        res.redirect("/api/login")
    }
 }