import {Router} from "express"
import { productsController, productToCart } from "../Controllers/productsController"
import { isLogged, loggedIsNotDestroyed } from "../middlewares/LoggedVerification"

const productsRoute = Router()

productsRoute.get("/",isLogged,loggedIsNotDestroyed ,productsController)

productsRoute.post("/:id",isLogged,loggedIsNotDestroyed, productToCart)



export default productsRoute
