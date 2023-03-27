import {Router} from "express"
import { isAdmin, isLogged, loggedIsNotDestroyed } from "../controller/auth"
import { checkAuth } from "../api/jws"
import { deleteAProduct, modifyAProduct, newProductController, productsGetController } from "../controller/products"

const productsRoute = Router()

productsRoute.get("/:id?",  productsGetController)

productsRoute.get("/category/:category", productsGetController)

productsRoute.post("/", loggedIsNotDestroyed, isLogged, isAdmin,checkAuth,  newProductController)

productsRoute.put("/:id", loggedIsNotDestroyed, isLogged, isAdmin,checkAuth, modifyAProduct)

productsRoute.delete("/:id", loggedIsNotDestroyed, isLogged, isAdmin, checkAuth, deleteAProduct)




export default productsRoute


