import mongoose from "mongoose";
import { productInCartObject } from "../cart/cart.interface";
export interface OrderObject extends NewOrderObject {
    _id: string
}
export interface NewOrderObject {
    items: productInCartObject[],
    numberOrder: number,
    timeStamp: string,
    state: string,
    gmail: string,
}