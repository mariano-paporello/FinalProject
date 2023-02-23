import mongoose, { Schema } from 'mongoose';
import dotenv from 'dotenv';
import config from '../../../config';
dotenv.config();

mongoose.set('strictQuery', false);

export class DaoMongoDB {    
    private collection
    private initDB

    constructor(collection:string, schema:Schema){
        this.collection = mongoose.model(collection, schema);
        this.initDB = mongoose.connect(config.MONGO_ATLAS_URL);
    }
    async initMongoDB() {
        return this.initDB;
    }
    async getCartById(id){
        const cart = await this.collection.findById(id)
        return cart
    }
    async getCartByQuery(query){
        const cart = await this.collection.findOne(query)
        return cart
    }
    async createCart(data){
        const cart = await this.collection.create(data)
        return cart
    }
    async updateCart(query, update){
        const cartUpdate= await this.collection.updateOne(query, update)
        return cartUpdate
    }
   
}