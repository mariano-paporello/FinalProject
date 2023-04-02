import { Router } from "express";
import { checkAuth } from "../api/jws";
import {
  isLogged,
  loggedIsNotDestroyed,
  logIn,
  logInGet,
  logout,
  register,
  registerGet,
} from "../controller/auth";

const logInRoute = Router();

logInRoute.post("/", logIn);

logInRoute.get("/", logInGet);

const logOutRoute = Router();

logOutRoute.get("/", isLogged, checkAuth, loggedIsNotDestroyed, logout);

const registerRoute = Router();

registerRoute.post("/", register);

registerRoute.get("/", registerGet);

const authRoute = Router();
authRoute.use("/login", logInRoute);
authRoute.use("/register", registerRoute);
authRoute.use("/logout", logOutRoute);

export default authRoute;
