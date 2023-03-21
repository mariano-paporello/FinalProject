import { Request, Response } from "express"
import { User } from "../../Public/types"
import { findProduct, getCartByUserId, getProducts, newProductToDB, updateCart } from "../api/products"
import { CartObject, productInCartObject } from "../models/cart/cart.interface"
import { DocumentMongoGet, ProductObject } from "../models/products/products.interface"

import {logger} from "../utils/loggers"


export const productsController = async (req:Request, res:Response)=>{
    try{
        res.json({
            productos: await getProducts(),
        })
    }catch(err){
        logger.error("Error in productsController: ",err)
    }
} 

export const productToCartController = async(req:Request, res:Response)=>{
    try{
        const product  = await findProduct(req.params.id)
        if(req.session.dataUser && product !== undefined && product !== null){
            await añadirProdACart(req.session.dataUser, product)
        }
        res.json({
            msg:"👍 👍 👍 👍 TODO BIENN ",
        })
    }catch(err){
        logger.error("Error in productsController: ",err)
    }
}

export const newProductController = async (req: Request, res:Response)=>{
    try {
        if(req.session.admin){
            const productCreated = await newProductToDB(req.body)
            return productCreated
        }
        else{
            return false
        }
    } catch (error) {
        logger.error(`Error in productsController: ${error}`)
    }
}


 const añadirProdACart = async (dataUser:User,product:ProductObject | DocumentMongoGet)=>{
    if(product){
        const userHasCart:CartObject | null = await getCartByUserId({userId: dataUser._id})
        if(userHasCart!== null){
            const index: number = await getIndex(userHasCart, product)
            
            if(userHasCart && index != -1 && index || index===0){
               return await addProduct(userHasCart, index, dataUser)
            }else if(userHasCart && index === -1){
                return await addQuantityInCart(product,  dataUser)
            }
        }
    }
    return product
}
const getIndex = async (cartOfUser:any, product:ProductObject | DocumentMongoGet)=>{
    const index: number = cartOfUser.cart.findIndex( (obj:productInCartObject) => {
        if(product){
        return obj.productId === product.id
        }
    })
    return index
}
const addProduct = async (cartOfUser:any, index:number, dataUser:User) =>{
    try{
        const newCart: any = cartOfUser.cart
        newCart[index] = {productId:newCart[index].productId, amount: newCart[index].amount+1}  
        const addAmountToaProduct = await updateCart({userId: dataUser._id},{$set:{cart:newCart}})
        return true
    }catch(err){
        logger.error("Error: ", err)
    }
}
const addQuantityInCart = async (product: ProductObject | DocumentMongoGet, dataUser:User)=>{
    try{
        if(product){
            const addOneProductToExistingCart = await updateCart({userId:dataUser._id},{$push: {cart:{productId: product._id, amount:1}}})
            return true 
        }
    }catch(err){
        logger.error("Error: ", err)
    }
}

export const modifyAProduct = async (req:Request, res:Response) => {
    const {id} = req.params
    const data: ProductObject = req.body
    const changedProduct = await updateCart({_id:id},data)
    if(changedProduct.acknowledged){
        res.status(200).json({
            msg: "Modificacion realizada de forma correcta"
        })
    }
    res.status(400).json({
        Error: "Modificacion fallida"
    })
}

export const deleteAProduct = async (req:Request, res:Response) => {
    


}