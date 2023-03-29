import { Response, Request } from "express"
import { finalProductForm, User , states} from "../../Public/types"
import { createOrder, numberOfOrderCreator, sendTheCartWithEmail, sendTheCartWithWhatsApp, getOrders, getOrderById, updateOrder } from "../api/orders"
import { logger } from "../utils/loggers"
import { cartGet } from "./cart"



export const getOrdersOfUser = async(req:Request, res:Response)=>{
    try {
        const userId = req.session.dataUser?._id
        const {id} = req.body
        if(userId ){
            if(id) {
                const order = await getOrderById(id)
                res.status(200).json({
                    OrdenBuscada: order
                })
            }else{
            const orders = await getOrders(userId)
            res.status(200).json({
                ordersOfTheUser: orders
            })
        }
    }
    } catch (error) {
        res.status(400).json({
            error: error
        })
    }
}

export const CreateOrder = async (data: finalProductForm, userData: User | undefined)=>{
    try {
        if(data && userData){ 
            const total =  getTotal(data)
        if(total){
            const order = {
                items: data,
                userId: userData._id,
                numberOrder: await numberOfOrderCreator() + 1,
                state: states.generate,
                gmail: userData.gmail,
                total: total
            }
            
                const createdOrder =await createOrder(order)
            return createdOrder  
        }
        }else{
            logger.error("ERROR CULOOO AAAA MUERTE PATRIACRADO")
        }  
    } catch (error) {
        logger.error(`Error: ${error}`)
        return error
    }
}

 const getTotal = (data:finalProductForm): number | undefined=>{
    let culo: number = 0
    const precioFinal = data.map((item)=>{
        if(item){
           return culo + item.price
        }
    })
    const resultado = precioFinal.reduce((prev, current)=>{
        if(prev && current) return prev + current
    })
    if(resultado)return resultado
    else{
        logger.error("ERROR IN ORDERS CONTROLLER GET TOTAL")
        return undefined
    }
}

export const sendMessages = async(req:Request, res:Response)=>{
    // HACER LA PARTE DE QUE MODIFIQUE LA ORDEN A COMPLETADA
    const dataUser = req.session.dataUser
    const idOfOrder = req.body.id
    if(dataUser&& idOfOrder){  
        const productsInCart:finalProductForm | undefined = await cartGet(dataUser._id) 
        if(productsInCart!== undefined){
            const orderUpdated = await updateState(idOfOrder)
            const order = await getOrderById(idOfOrder)
            if(!orderUpdated ){
                res.status(400).json({
                    Error: "Orden no encontrada o en estado no generado"
                })
            }else if(order){
            const productsHtml = productsInCart?.map(product=>{
                if(product!==undefined)
                return `<li>Producto:<ul><li>Nombre del Producto:${product.title}</li><li>Precio total: $${product.price}</li><li>Imagen del producto: <img src=${product.thumbnail} alt="Image Not Found"></li><li>Cantidad del producto: ${product.amount}</li></ul></li>`}
                ) 
            const content = `<div><h1>Productos:</h1><ul>${productsHtml}</ul><h2>Precio Total: $${order.total}</h2></div>`
            const message = `Nuevo pedido de ${dataUser.username}. Email: ${dataUser.gmail}.
                Productos: 
                ${productsInCart.map((product) =>{ product !== undefined? `-${product.title}.
                -${product.price}`: 'there are no products'})}`
            const done:unknown =  await cartMsgSender(dataUser, `Nuevo pedido de ${dataUser.username}. Email: ${dataUser.gmail}`, content, message)
            if(done){
                res.json({
                    msg: "Orden completada y envíada.",
                })
            }
        }
    }
}
}

const cartMsgSender = async(dataUser:User, subjectEmail:string, contentEmail:string, messageWhatsApp: string)=>{
    try{
        if(subjectEmail&&contentEmail&&messageWhatsApp){
            const enviarEmail = await sendTheCartWithEmail(dataUser.gmail, subjectEmail, contentEmail)
        const sendWhatsAppResponse = await sendTheCartWithWhatsApp(`+${dataUser.phoneNumber}`, messageWhatsApp)
        if(enviarEmail && sendWhatsAppResponse){
            return true
        }
        }
    }catch(error){
        logger.error("Error: ", error)
    }
}

const updateState= async(idOfOrder:string)=>{
    if(idOfOrder.length === 24){
       const order = await getOrderById(idOfOrder)
       if(order && order.state === "Generado"){
       return await  updateOrder({_id:idOfOrder}, {$set:{state: "Enviado"}})
       }else{
        logger.warn("Error: el order states es diferente a generado")
        return false
       }
    }
    else{
        logger.warn("El id enviado no tiene 24.")
        return false
    }

}