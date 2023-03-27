import { FilterQuery, UpdateQuery } from 'mongoose';
import { getDao } from "./orders.factory";
import { NewOrderObject, OrderObject } from './orders.interface';


 class ProductsRepository {
    private dao
    constructor() {
        this.dao = getDao();
    }

    async getAllOrdersOfTheUser(userId:string){
        const OrdersOfUser = this.dao.getAllOrdersOfTheUser(userId)
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
    }

    async updateOrder(query: FilterQuery<OrderObject>, update: UpdateQuery<OrderObject>){
        
    }


}
export const repositoryProduct = new ProductsRepository();

