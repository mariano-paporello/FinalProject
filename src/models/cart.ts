import mongoose from "mongoose"

const cartCollection= 'carts'

const cartSchema= new mongoose.Schema(
    {   
        user: {type: String, require:true},
        cart: [
            {
                title: {type: String, require:true, max: 100},
                price: { type: Number, require: true},
                thumbnail: { type: String, require: true, max: 100 },
                amount: { type: Number, require: true},
                category: { type: String, require:false}
            }
        ]
    },
    {timestamps: true}
)

const CartModel = mongoose.model(cartCollection,cartSchema)
export default CartModel 