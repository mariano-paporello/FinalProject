
import { Console } from "winston/lib/winston/transports";
import { singlePorduct, User } from "../../Public/types";
import { CartObject, productInCartObject } from "../models/cart/cart.interface";
import { repositoryCart } from "../models/cart/cart.repository";
import { DocumentMongoGet, ProductObject } from "../models/products/products.interface";
import { repositoryProduct } from "../models/products/products.repository";
import { logger } from "../utils/loggers";

export const findProduct = async (_id:string)=>{
    if(_id){
        const product = await repositoryProduct.getProductById(_id)
        return product
    }
}

export const getProducts = async()=>{
    return await repositoryProduct.getAllProd()
}

export const añadirProdACart = async (dataUser:User,product:ProductObject | DocumentMongoGet)=>{
    if(product){
        const userHasCart:CartObject | null = await repositoryCart.getCartByQuery({userId: dataUser._id})
        if(userHasCart!== null){
            const index: number | undefined = userHasCart.cart.findIndex( (obj:productInCartObject) => {
                return obj.productId === product.id
            })
            if(userHasCart && index != -1 && index || index===0){
                try{
                    const newCart: any = userHasCart.cart
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
    }
    return product
}