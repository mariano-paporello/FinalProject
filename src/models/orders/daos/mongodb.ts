import mongoose, { FilterQuery, Schema, UpdateQuery } from 'mongoose';
import config from '../../../config';
import { NewOrderObject, OrderObject } from '../orders.interface';

export class DaoMongoDB  {    
    private collection
    private initDB 

    constructor(collection:string, schema:Schema){
        this.collection = mongoose.model<OrderObject>(collection, schema);
        this.initDB = mongoose.connect(config.MONGO_ATLAS_URL);
    }

    async initMongoDB() {
        return this.initDB;
    }

    async getAllOrdersOfTheUser(userId:string){
        const OrdersOfUser = this.collection.find({userId: userId})
    }
    async getOrderById(id:string) {
        try {
            const orderFound = await this.collection.findById(id)
            return orderFound 
        } catch (error) {
            console.log(error)
        }
    }
async createAnOrder(data:NewOrderObject){
    return await this.collection.create(data)
}
    async updateOrder(query: FilterQuery<OrderObject>, update: UpdateQuery<OrderObject>){
    }
}
