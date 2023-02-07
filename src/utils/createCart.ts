import {cartModel} from "../models/cart";

export const createCartOfUser = async(dataUser) => await cartModel.createCart({userId:dataUser._id,cart:[]}) 