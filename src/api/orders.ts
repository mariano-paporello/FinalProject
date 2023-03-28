import { FilterQuery, UpdateQuery } from "mongoose"
import { NewOrderObject, OrderObject } from "../models/orders/orders.interface"
import { repositoryOrders } from "../models/orders/orders.repository"
import { EmailService } from "../services/email"
import { whatsappService } from "../services/twilio"

export const numberOfOrderCreator = async()=>{
    return await repositoryOrders.getNumberOfOrder()
}

export const createOrder= async(order: NewOrderObject)=>{
    return await repositoryOrders.createAnOrder(order)
}

export const getOrders = async(userId: string)=>{
    return await repositoryOrders.getOrders(userId)
}

export const getOrderById = async (id: string) => {
    return await repositoryOrders.getOrderById(id)
}

export const  sendTheCartWithEmail = async (gmail:string, subject:string, content:string) =>{
    const enviarEmail = await EmailService.sendEmail(gmail, subject, content)
    return true
}

export const sendTheCartWithWhatsApp = async(phoneNumber: string, message:string)=> {
    const whatsapp = await whatsappService.sendWhatsAppMessage(phoneNumber, message)
     return true
}

export const updateOrder = async(query:FilterQuery<OrderObject>, update: UpdateQuery<OrderObject>,)=>{
    return await repositoryOrders.updateOrder(query, update)
}