import { Router } from "express"
import { isLogged, loggedIsNotDestroyed } from "../controller/auth"
import { profileGet } from "../controller/profile"

const ProfileRoute = Router()

ProfileRoute.get("/",isLogged, loggedIsNotDestroyed, profileGet)

export default ProfileRoute