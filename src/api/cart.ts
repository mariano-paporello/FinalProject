import { EmailService } from "../services/email"
import { whatsappService } from "../services/twilio"
import { logger } from "../utils/loggers"
import { repositoryProduct } from "../models/products/products.repository"
import { repositoryCart } from "../models/cart/cart.repository"
import { CartObject, productInCartObject } from "../models/cart/cart.interface"
import { ProductToView, User, singlePorduct } from "../../Public/types"


export const cartGet = async(id:string) =>{
    try{
        const cartOfUser = await repositoryCart.getCartByQuery({userId:id})
        if(cartOfUser !== null){
            const productsInCart = await Promise.all(cartOfUser.cart.map(async product=> {
                const productFound = await repositoryProduct.getProductByQuery({_id: product.productId})
                return productFound
            })).then(async result => {
                return result.map(productFromProducts=>{
                    if(productFromProducts!==null){
                        const {title, price, thumbnail}= productFromProducts
                    const productInCart = cartOfUser.cart.filter((productInCart:productInCartObject)=>productFromProducts.id===productInCart.productId)
                    console.log("PRODUCTS IN CART: ", productInCart)
                    return {title, price: price*productInCart[0].amount, thumbnail, amount: productInCart[0].amount}
                    }
                })
            })
            return  productsInCart
        }
    }catch (error) {
        logger.error("Error: ", error)
    }
    
}

export const cartMsgSender = async(dataUser:User, subject:string, content:string, products:ProductToView)=>{
    try{
        if(products){
            const enviarEmail = await EmailService.sendEmail(dataUser.gmail, subject, content)
        const message = `Nuevo pedido de ${dataUser.username}. Email: ${dataUser.gmail}.
        Productos: 
        ${products.map((product:singlePorduct) =>{return `-${product.title}.
        -${product.price}`})}`
        const whatsapp = await whatsappService.sendWhatsAppMessage(`+${dataUser.phoneNumber}`, message)
        return true
        }
    }catch(error){
        logger.error("Error: ", error)
    }
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

