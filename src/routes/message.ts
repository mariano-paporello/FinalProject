import {Router} from "express"
import { isLogged, loggedIsNotDestroyed } from "../controller/auth"
import { checkAuth } from "../api/jws"
import { chat, chatById } from "../controller/mensajes"


const chatRoute = Router()

chatRoute.get("/",isLogged, checkAuth,  loggedIsNotDestroyed, chat )

chatRoute.get("/:id", isLogged, checkAuth, loggedIsNotDestroyed, chatById)


export default chatRoute