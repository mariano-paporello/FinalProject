import {Router} from "express"
import { isLogged, loggedIsNotDestroyed } from "../controller/auth"
import { cart, cartSender, productToCartController } from "../controller/cart"
import { checkAuth } from "../api/jws"


const cartRoute = Router()

cartRoute.get("/",isLogged, checkAuth,  loggedIsNotDestroyed, cart )

cartRoute.post("/",isLogged, checkAuth,  loggedIsNotDestroyed, cartSender )

cartRoute.post("/:id",loggedIsNotDestroyed, checkAuth, isLogged, productToCartController)


export default cartRoute