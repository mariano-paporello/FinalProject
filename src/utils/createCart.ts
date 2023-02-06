import CartModel from "../models/cart";

export const createCartOfUser = async(dataUser) => await CartModel.create({userId:dataUser._id,cart:[]}) 