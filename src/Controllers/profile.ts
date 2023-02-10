import { logger } from "../utils/loggers"

export const profileGet = (req, res)=>{
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    res.json({
        data: req.session.dataUser
    })
}