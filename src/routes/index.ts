import {Router} from "express"
import otherRoute from "./otherRoute";
import profileRoute from "./profile"
// import { usuario } from '../models/users/user.repository';
import passport from "passport";
import { loginFunc, signUpFunc, validateToken  } from "../controller/user";
import productsRoute from "./products";
import cors from "cors"
import cartRoute from "./cart";
import authRoute from "./auth";
import { homeview } from "../controller/viewController";

const mainRoute: Router = Router();


passport.use('login', loginFunc);
passport.use('signup', signUpFunc);
mainRoute.use("/other",otherRoute)
mainRoute.use("/profile", profileRoute)
mainRoute.use("/products", productsRoute)
mainRoute.use("/cart", cartRoute)
mainRoute.use("/auth",authRoute)
mainRoute.use(cors());

mainRoute.get('/', homeview)

export default mainRoute;