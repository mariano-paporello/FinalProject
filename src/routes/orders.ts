import {Router} from "express"
import { isLogged, loggedIsNotDestroyed } from "../controller/auth"
import { checkAuth } from "../api/jws"
import { sendMessages, getOrdersOfUser} from "../controller/orders"


const orderRoute = Router()

orderRoute.get("/:id?",isLogged, checkAuth,  loggedIsNotDestroyed, getOrdersOfUser )

orderRoute.post("/complete",isLogged, checkAuth,  loggedIsNotDestroyed, sendMessages )


export default orderRoute