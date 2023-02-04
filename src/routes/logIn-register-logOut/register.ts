import { Router } from "express";
import { register, registerGet } from "../../Controllers/login-Register-logOut/register";


const registerRoute = Router()


registerRoute.post('/', register)

registerRoute.get('/', registerGet)

export default registerRoute