import Config from "../config/index"
import { EmailService } from "../services/email"
import { whatsappService } from "../services/twilio"
import {cartModel} from "../models/cart"
import {productoModel} from "../models/products"
import { logger } from "../utils/loggers"


export const cartGet = async(id:string) =>{
    try{
        const cartOfUser:any = await cartModel.getCartByQuery({userId:id})
        const productsInCart = await Promise.all(cartOfUser.cart.map(async product=> {
            const productFound = await productoModel.getProductByQuery({_id: product.productId})
            return productFound
        })).then(result => {
            return result
        })
        return  productsInCart
    }catch (error) {
        logger.error("Error: ", error)
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
        return true
    }catch(error){
        logger.error("Error: ", error)
    }
}
export const emptyCartCreator =async (id) => {
    try{
        const emptyCart =  await cartModel.createCart({userId:id,cart:[]})
        return  emptyCart
    }catch (error) {
        logger.error("Error: ", error)
    }
}
export const checkCart = async (id) =>{
    try {
        
    
   const cartFound = await  cartModel.getCartByQuery({userId: id})
   return cartFound
} catch (error) {
    logger.error("Error: ", error)
}
}