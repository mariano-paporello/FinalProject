import {Router} from "express"
import { isLogged, loggedIsNotDestroyed } from "../controller/auth"
import { cart, cartSender } from "../controller/cart"


const cartRoute = Router()

cartRoute.get("/",isLogged, loggedIsNotDestroyed, cart )

cartRoute.post("/",isLogged, loggedIsNotDestroyed, cartSender )


export default cartRoute