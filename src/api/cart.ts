import { EmailService } from "../services/email"
import { whatsappService } from "../services/twilio"
import { logger } from "../utils/loggers"
import { repositoryProduct } from "../models/products/products.repository"
import { repositoryCart } from "../models/cart/cart.repository"
import { CartObject, productInCartObject } from "../models/cart/cart.interface"
import { ProductToView, User, singlePorduct } from "../../Public/types"
import { ProductObject } from "../models/products/products.interface"
import { UnknownObject } from "express-handlebars/types"


export const getProductById = async(id: string)=>{
    return await repositoryProduct.getProductById(id)
}

export const getCartByQuery = async (query: unknown)=>{
    return await repositoryCart.getCartByQuery(query)
}



export const  sendTheCartWithEmail = async (gmail:string, subject:string, content:string) =>{
    const enviarEmail = await EmailService.sendEmail(gmail, subject, content)
    return true
}

export const sendTheCartWithWhatsApp = async(phoneNumber: string, message:string)=> {
    const whatsapp = await whatsappService.sendWhatsAppMessage(phoneNumber, message)
     return true
}
export const emptyCartCreator =async (id:string) => {
    try{
        const emptyCart =  await repositoryCart.createCart({userId:id,cart:[]})
        return  emptyCart
    }catch (error) {
        logger.error("Error: ", error)
    }
}
export const checkCart = async (id:string) =>{
    try {
   const cartFound = await  repositoryCart.getCartByQuery({userId: id})
   return cartFound
} catch (error) {
    logger.error("Error: ", error)
}
}

