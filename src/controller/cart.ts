import {emptyCartCreator, checkCart, getProductById, getCartByQuery, sendTheCartWithEmail, sendTheCartWithWhatsApp } from "../api/cart"
import { logger } from "../utils/loggers"
import {ProductToView, User} from "../../Public/types"
import { Request, Response } from "express"
import { ProductObject } from "../models/products/products.interface"
import { CartObject, productInCartObject } from "../models/cart/cart.interface"


// export const cart = async(req:Request, res:Response)=>{
//     if(req.session.dataUser){
//         const productsInCart = await cartGet(req.session.dataUser._id)
//     res.json({
//         productsInCart : productsInCart
//     })
//     }
// }


// const cartGet = async(id:string): Promise<ProductToView | undefined> =>{
//     try{
        
//         const cartOfUser = await getCartByQuery({userId:id})
//         if(cartOfUser !== null){
            // return await cartTransformer(cartOfUser)
//         }
//     }catch (error) {
//         logger.error("Error: ", error)
//     }
    
// }

// const cartTransformer =async (cartOfUser: CartObject): Promise<ProductToView | void> => {
//     const productsInCart = await Promise.all(cartOfUser.cart.map(async product=> {
//         return getProduct(product)
//     })).then(async result => {
//         return  result.map(async productFromProducts=>{
//             if(productFromProducts !== undefined)
//             return  modifyTheProductToLookGood(productFromProducts, cartOfUser)
//         })
//     })
//     // return productsInCart
// }

// const getProduct =async (product:productInCartObject): Promise<ProductObject | undefined> => {
    
//     const productFound = await getProductById(product.productId)
//     if(productFound !== null){
//         return productFound
//     }
// }

// const modifyTheProductToLookGood = (productFromProducts: ProductObject , cartOfUser:CartObject)=>{
//     if(productFromProducts!==null){
//         const {title, price, thumbnail}= productFromProducts
//     const productInCart = cartOfUser.cart.filter((productInCart:productInCartObject)=>productFromProducts.id===productInCart.productId)
//     console.log("PRODUCTS IN CART: ", productInCart)
//     return {title, price: price*productInCart[0].amount, thumbnail, amount: productInCart[0].amount}
//     }
// }




// export const cartSender = async(req:Request, res:Response)=>{
//     try {
//         const dataUser = req.session.dataUser
//         if(dataUser){
//             const productsInCart:ProductToView | undefined = await cartGet(dataUser._id)
//             if(productsInCart!== undefined){
//                 const productsHtml = productsInCart?.map(product=>{
//                     if(product!==undefined)
//                     return `<li>Producto:<ul><li>Nombre del Producto:${product.title}</li><li>Precio total: $${product.price}</li><li>Imagen del producto: <img src=${product.thumbnail} alt="Image Not Found"></li><li>Cantidad del producto: ${product.amount}</li></ul></li>`}
//                     ) 
//                 const content = `<div><h1>Productos:</h1><ul>${productsHtml}</ul></div>`
//                 const message = `Nuevo pedido de ${dataUser.username}. Email: ${dataUser.gmail}.
//                     Productos: 
//                     ${productsInCart.map((product) =>{return `-${product.title}.
//                     -${product.price}`})}`
//                 const done:unknown =  await cartMsgSender(dataUser, `Nuevo pedido de ${dataUser.username}. Email: ${dataUser.gmail}`, content, message)
//                 if(done){
//                     res.json({
//                         msg: "TODO PERFECTO EMAIL ENVIADO"
//                     })
//                 }
//             }
        
//         }
//     } catch (err) {
//         logger.error("Error: ", err)
//     }
// }

//  const cartMsgSender = async(dataUser:User, subjectEmail:string, contentEmail:string, messageWhatsApp: string)=>{
//     try{
//         if(subjectEmail&&contentEmail&&messageWhatsApp){
//             const enviarEmail = await sendTheCartWithEmail(dataUser.gmail, subjectEmail, contentEmail)
        
//         const sendWhatsAppResponse = await sendTheCartWithWhatsApp(`+${dataUser.phoneNumber}`, messageWhatsApp)
//         if(enviarEmail && sendWhatsAppResponse){
//             return true
//         }
//         }
//     }catch(error){
//         logger.error("Error: ", error)
//     }
// }

export const createCartOfUser = async(dataUser:User) => await emptyCartCreator(dataUser._id) 


export const ifCartExist = async(dataUser:User) =>{
    const cartFound:unknown  = await checkCart(dataUser._id)
   return cartFound ? null : createCartOfUser(dataUser)
}
