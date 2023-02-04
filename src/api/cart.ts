import CartModel from "../models/cart"
import ProductoModel from "../models/products"
import { logger } from "../utils/loggers"


export const CACA = async(req, res) =>{
    try{
        
        const cart:any = await CartModel.findOne({userId: req.session.dataUser._id})
        console.log("🧮🧮🧮",cart)
        const arrayProducts:any = []
        arrayProducts.push(await cart.cart.map(async element =>{
            const productObj:any = await ProductoModel.find({_id:element.productId})
            arrayProducts.push( productObj[0])
            return arrayProducts
        }))
        console.log("📧📧📧📧Array", await arrayProducts) 
        res.json({
        carrito: await arrayProducts,
        data: req.session.dataUser
        })
    }catch(err){
        logger.error("Error: ", err)
    }
    

}