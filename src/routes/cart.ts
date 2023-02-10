import {Router} from "express"
import { cart, cartSender } from "../Controllers/cart"
import { isLogged, loggedIsNotDestroyed } from "../middlewares/LoggedVerification"

const cartRoute = Router()

cartRoute.get("/",isLogged, loggedIsNotDestroyed, cart )

cartRoute.post("/",isLogged, loggedIsNotDestroyed, cartSender )


export default cartRoute