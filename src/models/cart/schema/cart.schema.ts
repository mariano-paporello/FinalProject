import mongoose from "mongoose"
import { CartObject } from "../cart.interface"

export const cartSchema= new mongoose.Schema<CartObject>(
    {   
        userId: {type: String, require:true},
        cart: [
            {
                productId: { type: String, require: true},
                amount: { type: Number, require: true},
            }
        ]
    }
)