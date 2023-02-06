import { createLogger } from "winston"
import Config from "../config/index"
import { EmailService } from "../middlewares/email"
import { whatsappService } from "../middlewares/twilio"
import CartModel from "../models/cart"
import ProductoModel from "../models/products"
import { logger } from "../utils/loggers"


export const cartGet = async(id:string) =>{
    try{
        const cartOfUser:any = await CartModel.findOne({userId:id})
        const productsInCart = await Promise.all(cartOfUser.cart.map(async product=> {
            const productFound = await ProductoModel.findOne({_id: product.productId})
            return productFound
        })).then(result => {
            return result
        })
        return  productsInCart
    }catch(err){
        logger.error("Error: ", err)
    }
    
}

export const cartMsgSender = async(dataUser, subject, content, products)=>{
    try{
        console.log(Config.GMAIL_ADDRESS, Config.GMAIL_PASSWORD)
        const enviarEmail = await EmailService.sendEmail(dataUser.gmail, subject, content)
        const message = `Nuevo pedido de ${dataUser.username}. Email: ${dataUser.gmail}.
        Productos: 
        ${products.map(product =>{return `-${product.title}.
        -${product.price}`})}`
        console.log(message)
        const whatsapp = await whatsappService.sendWhatsAppMessage(`+${dataUser.phoneNumber}`, message)
        return enviarEmail
    }catch(err){
        logger.error("Error: ", err)
    }

}