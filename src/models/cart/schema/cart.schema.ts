import mongoose from "mongoose"

export const cartSchema= new mongoose.Schema(
    {   
        userId: {type: String, require:true},
        cart: [
            {
                productId: { type: String, require: true},
                amount: { type: Number, require: true},
            }
        ]
    },
    {timestamps: true}
)