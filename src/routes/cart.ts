import { Router } from "express";
import { isLogged, loggedIsNotDestroyed } from "../controller/auth";
import {
  cart,
  cartSender,
  deleteCartProducts,
  productToCartController,
} from "../controller/cart";
import { checkAuth } from "../api/jws";

const cartRoute = Router();

cartRoute.get("/", isLogged, checkAuth, loggedIsNotDestroyed, cart);

cartRoute.post(
  "/add/:id",
  loggedIsNotDestroyed,
  checkAuth,
  isLogged,
  productToCartController
);

cartRoute.post(
  "/submit",
  isLogged,
  checkAuth,
  loggedIsNotDestroyed,
  cartSender
);

cartRoute.delete(
  "/delete",
  isLogged,
  checkAuth,
  loggedIsNotDestroyed,
  deleteCartProducts
);

export default cartRoute;
