import mongoose from "mongoose"

const collection= 'carts'

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

class CartMongo{
    private cart

    constructor(){
        this.cart = mongoose.model(collection, cartSchema)
    }
    async getCartById(id){
        const cart = await this.cart.findById(id)
        return cart
    }
    async getCartByQuery(query){
        const cart = await this.cart.findOne(query)
        return cart
    }
    async createCart(data){
        const cart = await this.cart.create(data)
        return cart
    }
    async updateCart(query, update){
        const cartUpdate= await this.cart.updateOne(query, update)
        return cartUpdate
    }
}


export const cartModel = new CartMongo() 