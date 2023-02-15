
import { repositoryCart } from "../models/cart/cart.repository";
import { repositoryProduct } from "../models/products/products.repository";
import { logger } from "../utils/loggers";

export const findProduct = async (_id)=>{
    if(_id){
        const product = await repositoryProduct.getProductById(_id)
        return product
    }
}

export const getProducts = async()=>{
    return await repositoryProduct.getAllProd()
}

export const añadirProdACart = async (dataUser,product)=>{
    if(product){
        const userHasCart:any = await repositoryCart.getCartByQuery({userId: dataUser._id})
        const index: any = userHasCart?.cart.findIndex( obj => {
            return obj.productId === product.id
        })
        if(userHasCart && index != -1 && index || index===0){
            try{
                const newCart:any = userHasCart?.cart
                newCart[index] = {productId:newCart[index].productId, amount: newCart[index].amount+1}  
                const addAmountToaProduct = await repositoryCart.updateCart({userId: dataUser._id},{$set:{cart:newCart}})
                return true
            }catch(err){
                logger.error("Error: ", err)
            }
        }else if(userHasCart && index === -1){
            try{
                const addOneProductToExistingCart = await repositoryCart.updateCart({userId:dataUser._id},{$push: {cart:{productId: product._id, amount:1}}})
                return true 
            }catch(err){
                logger.error("Error: ", err)
            }
            
        }
    }
    return product
}