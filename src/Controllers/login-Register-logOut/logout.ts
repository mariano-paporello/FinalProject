import { logger } from "../../utils/loggers"
import { logged } from "../../utils/logged"

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