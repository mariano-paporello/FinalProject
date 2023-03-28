import mongoose, { FilterQuery, Schema, UpdateQuery } from 'mongoose';
import config from '../../../config';
import { NewOrderObject, OrderObject, OrdersBaseClass } from '../orders.interface';

export class DaoMongoDB implements OrdersBaseClass {    
    private collection
    private initDB 

    constructor(collection:string, schema:Schema){
        this.collection = mongoose.model<OrderObject>(collection, schema);
        this.initDB = mongoose.connect(config.MONGO_ATLAS_URL);
    }

    async initMongoDB() {
        return this.initDB;
    }

    async getNumberOfOrder(){
        const OrdersLength = (await this.collection.find()).length
        return OrdersLength
    }
    async getOrders(userId: string){
        const ordersOfTheUser = await this.collection.find({userId: userId})
        return ordersOfTheUser
    }
    async getOrderById(id:string) {
        try {
            console.log("id",id)
            const orderFound = await this.collection.findOne({_id:id})
            console.log(orderFound)
            return orderFound 
        } catch (error) {
            console.log(error)
        }
    }
    async createAnOrder(data:NewOrderObject){
        return await this.collection.create(data)
    }
    async updateOrder(query: FilterQuery<OrderObject>, update: UpdateQuery<OrderObject>){
        return await this.collection.updateOne(query, update)
    }
}
