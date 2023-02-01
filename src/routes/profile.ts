import { Router } from "express"
import { isLogged, loggedIsNotDestroyed } from "../middlewares/LoggedVerification"
import { logger } from "../utils/loggers"

const ProfileRoute = Router()

ProfileRoute.get("/",isLogged, loggedIsNotDestroyed, (req, res)=>{
    logger.info( "METODO:"+req.method + " RUTA:"+ req.url )
    res.render("profile",{
        data: req.session.dataUser
    })
})

export default ProfileRoute