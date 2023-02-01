import {Router} from "express"
import { productsController } from "../Controllers/msgAndProd/productsController"
import { isLogged, loggedIsNotDestroyed } from "../middlewares/LoggedVerification"

const productsRoute = Router()

productsRoute.get("/",isLogged,loggedIsNotDestroyed ,productsController)





export default productsRoute
