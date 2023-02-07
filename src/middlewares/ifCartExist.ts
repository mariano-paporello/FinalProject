import {cartModel} from "../models/cart"
import { createCartOfUser } from "../utils/createCart"

export const ifCartExist = async(dataUser) =>{
    const cartFound = await  cartModel.getCartByQuery({userId: dataUser._id})
    console.log("🥼🥼🥼🥼 CartFound", cartFound) 
    return cartFound ? null : createCartOfUser(dataUser) 
}