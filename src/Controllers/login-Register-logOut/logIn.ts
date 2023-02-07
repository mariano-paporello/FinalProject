import passport from "passport"
import { logger } from "../../utils/loggers"
import { generateToken } from "../../services/auth"
import { logged } from "../../utils/logged"



// CAMBIAR LA LOGICA PARA PODER PASARLO A CAPAS
export const logIn =  async (req, res, next) => {
    passport.authenticate('login', {}, async (err, user, info) => {
    logger.info( "METODO:"+ req.method + " RUTA:"+ req.url )
    if (user.gmail && user.password) {
        logged.nombre = user.username
        logged.contraseña = true
        logged.islogged = true
        const token = await generateToken(user)
        res.header('Access-Control-Expose-Headers', 'x-auth-token').header('x-auth-token', token).status(200).json({
                msg: 'login OK',
                headers: req.headers,
                dato: 'ok',
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