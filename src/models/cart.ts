import mongoose from "mongoose"

const cartCollection= 'carts'

const cartSchema= new mongoose.Schema(
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

const CartModel = mongoose.model(cartCollection,cartSchema)
export default CartModel 