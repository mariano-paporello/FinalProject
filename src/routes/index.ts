import {Router} from "express"
import otherRoute from "./otherRoute";
import profileRoute from "./profile"
import passport from "passport";
import { loginFunc, signUpFunc} from "../controller/user";
import productsRoute from "./products";
import cors from "cors"
import cartRoute from "./cart";
import authRoute from "./auth";
import { homeview } from "../controller/viewController";
import orderRoute from "./orders";
import chatRoute from "./message";

const mainRoute: Router = Router();


passport.use('login', loginFunc);
passport.use('signup', signUpFunc);
mainRoute.use("/other",otherRoute)
mainRoute.use("/profile", profileRoute)
mainRoute.use("/products", productsRoute)
mainRoute.use("/cart", cartRoute)
mainRoute.use("/auth",authRoute)
mainRoute.use("/orders", orderRoute)
mainRoute.use("/chat", chatRoute)
mainRoute.use(cors());

mainRoute.get('/', homeview)

export default mainRoute;