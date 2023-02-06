import CartModel from "../models/cart"
import { createCartOfUser } from "../utils/createCart"

export const ifCartExist = async(dataUser) =>{
    const cartFound = await  CartModel.findOne({userId: dataUser._id})
    console.log("🥼🥼🥼🥼 CartFound", cartFound) 
    return cartFound ? null : createCartOfUser(dataUser) 
}