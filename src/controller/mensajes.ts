import { Request, Response } from "express";
import { getMessages } from "../api/messages";


export const chat =async(req:Request, res:Response)=>{
    res.render('main', {data: req.session.dataUser})
}
// HACER PARA QUE SE PUEDA  ACEDER A LA RUTA CART SIN AUTHORIZACION SIEMPRE QUE ESTES LOGEADO
// PODER VER EL CART EN NORMAL 

export const chatById = async ( req: Request, res:Response)=>{
    const id = req.session.dataUser?._id
    if(id){
        const messagesOfUser = await getMessages(id)
        res.status(200).json({
            messages: messagesOfUser
        })
    }
}