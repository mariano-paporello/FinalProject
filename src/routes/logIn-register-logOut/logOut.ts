import { Router } from "express";
import { logout } from "../../Controllers/login-Register-logOut/logout";

const logOutRoute = Router()

logOutRoute.get("/", logout)

export default logOutRoute