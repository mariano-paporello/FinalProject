import CartModel from "../models/cart";
import ProductoModel from "../models/products";
import { logger } from "../utils/loggers";

export const findProduct = async (_id)=>{
    if(_id){
        const product = await ProductoModel.findById({_id})
        return product
    }
}

export const getProducts = async()=>{
    return await ProductoModel.find({})
}

export const añadirProdACart = async (dataUser,product)=>{
    if(product){
        const userHasCart = await CartModel.findOne({userId: dataUser._id})
        const index: any = userHasCart?.cart.findIndex( obj => {
            return obj.productId === product.id
        })
        if(userHasCart && index != -1 && index || index===0){
            try{
                const newCart:any = userHasCart?.cart
                newCart[index] = {productId:newCart[index].productId, amount: newCart[index].amount+1}  
                const caca = await CartModel.updateOne({userId: dataUser._id},{$set:{cart:newCart}})
            }catch(err){
                logger.error("Error: ", err)
            }
        }else if(userHasCart && index === -1){
            try{
                const culo = await CartModel.updateOne({userId:dataUser._id},{$push: {cart:{productId: product._id, amount:1}}})
                return true 
            }catch(err){
                logger.error("Error: ", err)
            }
            
        }
    }
    return product
}