import { cartMsgSender, cartGet, emptyCartCreator, checkCart } from "../api/cart"
import { logger } from "../utils/loggers"


export const cart = async(req, res)=>{
    const productsInCart = await cartGet(req.session.dataUser._id)
    res.json({
        productsInCart : productsInCart
    })
}

export const cartSender = async(req, res)=>{
    try {
        const dataUser = req.session.dataUser
        const productsInCart = await cartGet(dataUser._id)
        const productsHtml = productsInCart?.map(product=>`<li>${product}</li>`) 
        const content = `<div><h1>Productos:</h1><ul>${productsHtml}</ul></div>`
        const done =  await cartMsgSender(dataUser, `Nuevo pedido de ${dataUser.username}. Email: ${dataUser.gmail}`, content, productsInCart)
        if(done){
            res.json({
                msg: "TODO PERFECTO EMAIL ENVIADO"
            })
        }
    } catch (err) {
        logger.error("Error: ", err)
    }
}

export const createCartOfUser = async(dataUser) => await emptyCartCreator(dataUser._id) 


export const ifCartExist = async(dataUser) =>{
    const cartFound:any  = await checkCart(dataUser._id)
   return cartFound ? null : createCartOfUser(dataUser)
}
