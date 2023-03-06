import { Request, Response } from "express"
import { añadirProdACart, findProduct, getProducts } from "../api/products"

import {logger} from "../utils/loggers"


export const productsController = async (req:Request, res:Response)=>{
    try{
        res.json({
            productos: await getProducts(),
        })
    }catch(err){
        logger.error("Error: ",err)
    }
} 

export const productToCart = async(req:Request, res:Response)=>{
    try{
        const product  = await findProduct(req.params.id)
        if(req.session.dataUser && product !== undefined && product !== null){
            await añadirProdACart(req.session.dataUser, product)
        }
        res.json({
            msg:"👍 👍 👍 👍 TODO BIENN ",
        })
    }catch(err){
        logger.error("Error: ",err)
    }
}
