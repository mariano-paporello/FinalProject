import Config from "../config/index"
import { EmailService } from "../services/email"
import { whatsappService } from "../services/twilio"
import { logger } from "../utils/loggers"
import { repositoryProduct } from "../models/products/products.repository"
import { repositoryCart } from "../models/cart/cart.repository"


export const cartGet = async(id:string) =>{
    try{
        const cartOfUser:any = await repositoryCart.getCartByQuery({userId:id})
        const productsInCart = await Promise.all(cartOfUser.cart.map(async product=> {
            const productFound = await repositoryProduct.getProductByQuery({_id: product.productId})
            return productFound
        })).then(async result => {
            return result.map(productFromProducts=>{
                const {title, price, thumbnail}= productFromProducts
                const productInCart = cartOfUser.cart.filter(productInCart=>productFromProducts.id===productInCart.productId)
                return {title, price: price*productInCart[0].amount, thumbnail, amount: productInCart[0].amount}
            })
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
        const emptyCart =  await repositoryCart.createCart({userId:id,cart:[]})
        return  emptyCart
    }catch (error) {
        logger.error("Error: ", error)
    }
}
export const checkCart = async (id) =>{
    try {
        
    
   const cartFound = await  repositoryCart.getCartByQuery({userId: id})
   return cartFound
} catch (error) {
    logger.error("Error: ", error)
}
}






// let product:any 
            // const cartToRetrive = await Promise.all(result.map(async elementOfResult=>{
            //     console.log("ELEMENT OF RESULT ",elementOfResult)
                
            //     const products = await cartOfUser.cart.map( elementOfUser =>{
            //         console.log("element of user ", elementOfUser)
            //         if( elementOfResult.id === elementOfUser.productId ){
            //         product = {title:elementOfResult.title, price: elementOfResult.price * elementOfUser.amount, thumbnail: elementOfResult.thumbnail, amount: elementOfUser.amount}
            //         return product
            //     }
            //     })
            //     console.log(products)
            // }))
            // console.log("CARRITO A DEVOLVER: ", cartToRetrive)
            // // return cartToRetrive
            // return "lol"