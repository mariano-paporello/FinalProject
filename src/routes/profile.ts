import { Router } from "express"
import { profileGet } from "../Controllers/profile"
import { isLogged, loggedIsNotDestroyed } from "../middlewares/LoggedVerification"

const ProfileRoute = Router()

ProfileRoute.get("/",isLogged, loggedIsNotDestroyed, profileGet)

export default ProfileRoute