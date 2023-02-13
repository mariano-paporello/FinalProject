import { añadirProdACart, findProduct, getProducts } from "../api/products"
import {logger} from "../utils/loggers"


export const productsController = async (req, res)=>{
    try{
        res.json({
            productos: await getProducts(),
        })
    }catch(err){
        logger.error("Error: ",err)
    }
} 

export const productToCart = async(req, res)=>{
    try{
        const product = await findProduct(req.params.id)
        await añadirProdACart(req.session.dataUser, product)
        res.json({
            msg:"👍 👍 👍 👍 TODO BIENN ",
        })
    }catch(err){
        logger.error("Error: ",err)
    }
}
