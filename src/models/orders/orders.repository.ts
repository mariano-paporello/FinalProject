import { FilterQuery, UpdateQuery } from 'mongoose';
import { getDao } from "./orders.factory";
import { NewOrderObject, OrderObject } from './orders.interface';


 class OrdersRepository {
    private dao
    constructor() {
        this.dao = getDao();
    }

    async getNumberOfOrder(){
        const OrdersLength = await this.dao.getNumberOfOrder()
        return OrdersLength
    }

    async getOrders(userId: string){
        const ordersOfUser = await this.dao.getOrders(userId)
        return ordersOfUser
    }

    async getOrderById(id:string) {
        try {
            const orderFound = await this.dao.getOrderById(id)
            return orderFound
        } catch (error) {
            console.log(error)
        }
    }
    async createAnOrder(data: NewOrderObject){
        const createdOrder= await this.dao.createAnOrder(data)
        return createdOrder
    }

    async updateOrder(query: FilterQuery<OrderObject>, update: UpdateQuery<OrderObject>){
        const updateResult = await this.dao.updateOrder(query, update)
        return updateResult
    }


}
export const repositoryOrders = new OrdersRepository();

