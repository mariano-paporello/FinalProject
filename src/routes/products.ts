import {Router} from "express"
import { isAdmin, isLogged, loggedIsNotDestroyed } from "../controller/auth"
import { checkAuth } from "../api/jws"
import { deleteAProduct, modifyAProduct, newProductController, productsController, productToCartController } from "../controller/products"

const productsRoute = Router()

productsRoute.get("/",loggedIsNotDestroyed, checkAuth, isLogged, productsController)

productsRoute.post("/:id",loggedIsNotDestroyed, /*checkAuth,*/ isLogged, productToCartController)

productsRoute.post("/", loggedIsNotDestroyed, /*checkAuth,*/ isLogged, isAdmin, newProductController)

productsRoute.put("/:id", loggedIsNotDestroyed, isLogged, isAdmin, modifyAProduct)

productsRoute.delete("/:id", loggedIsNotDestroyed, isLogged, isAdmin, deleteAProduct)
export default productsRoute


