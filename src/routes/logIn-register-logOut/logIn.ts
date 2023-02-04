import { Router } from "express";
import { logIn, logInGet } from "../../Controllers/login-Register-logOut/logIn";


const logInRoute = Router()


logInRoute.post('/', logIn)

logInRoute.get('/', logInGet)

export default logInRoute