import { Request, Response } from "express"
import { añadirProdACart, findProduct, getProducts, newProductToDB } from "../api/products"

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