import passport from "passport"
import { logger } from "../../utils/loggers"
import { generateToken } from "../../services/auth"
import { logged } from "../../utils/logged"


export const register = async (req, res, next) => {
    // Esto a un controller
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
        res.header('x-auth-token', token).json({
            msg: `User creado: ${user}`,
        })
    })(req, res, next)
}

export const registerGet = (req, res) => {
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    res.json({msg:"Estas en la Ruta register"})
}