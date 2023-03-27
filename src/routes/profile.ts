import { Router } from "express"
import { checkAuth } from "../api/jws"
import { isLogged, loggedIsNotDestroyed } from "../controller/auth"
import { profileGet } from "../controller/profile"

const ProfileRoute = Router()

ProfileRoute.get("/",checkAuth, isLogged, loggedIsNotDestroyed, profileGet)

export default ProfileRoute