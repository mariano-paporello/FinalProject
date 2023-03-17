import {Router} from "express"
import { isLogged, loggedIsNotDestroyed } from "../controller/auth"
import { newProductController, productsController, productToCartController } from "../controller/products"

const productsRoute = Router()

productsRoute.get("/",loggedIsNotDestroyed, isLogged, productsController)

productsRoute.post("/toCart/:id",loggedIsNotDestroyed, isLogged, productToCartController)

productsRoute.post("/", loggedIsNotDestroyed, isLogged, newProductController)

export default productsRoute
