import {Router} from "express"
import { isLogged, loggedIsNotDestroyed } from "../controller/auth"
import { productsController, productToCart } from "../controller/products"

const productsRoute = Router()

productsRoute.get("/",loggedIsNotDestroyed ,productsController)

productsRoute.post("/:id",loggedIsNotDestroyed, productToCart)



export default productsRoute
