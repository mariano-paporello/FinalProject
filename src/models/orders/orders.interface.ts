import { FilterQuery, UpdateQuery } from "mongoose";
import { finalProductForm } from "../../../Public/types";
export interface OrderObject extends NewOrderObject {
    _id: string
}
export interface NewOrderObject {
    items: finalProductForm,
    userId: string
    numberOrder: number,
    state: states,
    gmail: string,
    total: number
}
type UpdateResult = {
    acknowledged: boolean;
    matchedCount: number;
    modifiedCount: number;
}
enum states{
    generate = "Generado",
    paid = "Pago",
    send = "Enviado",
    ended = "Finalizado"
}
export interface OrdersBaseClass{
    getNumberOfOrder(): Promise<number>
    getOrderById(id:string): Promise<any>
    createAnOrder(data:NewOrderObject): Promise<OrderObject>
    updateOrder(query:FilterQuery<OrderObject>, update:UpdateQuery<OrderObject>): Promise<UpdateResult>
}