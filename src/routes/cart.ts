import {Router} from "express"
import { cart } from "../Controllers/cart"
import { isLogged, loggedIsNotDestroyed } from "../middlewares/LoggedVerification"

const cartRoute = Router()

cartRoute.get("/",isLogged, loggedIsNotDestroyed, cart )


export default cartRoute