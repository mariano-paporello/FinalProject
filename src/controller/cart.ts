import { cartMsgSender, cartGet, emptyCartCreator, checkCart } from "../api/cart"
import { logger } from "../utils/loggers"
import {ProductToView, User} from "../../Public/types"
import { Request, Response } from "express"


export const cart = async(req:Request, res:Response)=>{
    if(req.session.dataUser){
        const productsInCart = await cartGet(req.session.dataUser._id)
    res.json({
        productsInCart : productsInCart
    })
    }
}

export const cartSender = async(req:Request, res:Response)=>{
    try {
        const dataUser = req.session.dataUser
        if(dataUser){
            const productsInCart: ProductToView = await cartGet(dataUser._id)
        const productsHtml = productsInCart?.map(product=>{
            if(product!==undefined)
            return `<li>Producto:<ul><li>Nombre del Producto:${product.title}</li><li>Precio total: $${product.price}</li><li>Imagen del producto: <img src=${product.thumbnail} alt="Image Not Found"></li><li>Cantidad del producto: ${product.amount}</li></ul></li>`}
            ) 
        const content = `<div><h1>Productos:</h1><ul>${productsHtml}</ul></div>`
        const done:unknown =  await cartMsgSender(dataUser, `Nuevo pedido de ${dataUser.username}. Email: ${dataUser.gmail}`, content, productsInCart)
        if(done){
            res.json({
                msg: "TODO PERFECTO EMAIL ENVIADO"
            })
        }
        }
    } catch (err) {
        logger.error("Error: ", err)
    }
}

export const createCartOfUser = async(dataUser:User) => await emptyCartCreator(dataUser._id) 


export const ifCartExist = async(dataUser:User) =>{
    const cartFound:unknown  = await checkCart(dataUser._id)
   return cartFound ? null : createCartOfUser(dataUser)
}
