import mongoose, { Schema } from 'mongoose';
import config from '../../../config';
import { AddProductObject, ProductBaseClass, ProductObject, DocumentMongoGet, DocumentMongoPost } from '../products.interface';

mongoose.set('strictQuery', true);

// ARREGLAR LOS ANY
export class DaoMongoDB implements ProductBaseClass{    
    private collection
    private initDB 

    constructor(collection:string, schema:Schema){
        this.collection = mongoose.model(collection, schema);
        this.initDB = mongoose.connect(config.MONGO_ATLAS_URL);
    }

    async initMongoDB() {
        return this.initDB;
    }

    async getAllProd(){
        const products:ProductObject[] | [] = await this.collection.find({})
        return products
    }
    async getProductById(id:string) {
        const productFound: ProductObject | DocumentMongoGet  = await this.collection.findById(id)
        return productFound
    }
    async getProductByQuery(query:any){
        const productFound: ProductObject | DocumentMongoGet   = await this.collection.findOne(query)
        return productFound
    }
    async postProductToProducts(data:AddProductObject){
        const productAdded: ProductObject | DocumentMongoPost  =  await this.collection.create(data);
        return productAdded
    }
    async deleteByQuery(query:any){
        const deleting = await this.collection.deleteOne(query)
        return deleting
    }
    async deleteAll(){
        await this.collection.deleteMany()
        return true
    }

// GRAPHQL

    // async postProductToProductsGraphql(data:{title:String, price:Number, thumbnail:String, category:String, stock:Number}){
    //     const productAdded: ProductObject | DocumentMongoPost  =  await this.collection.create(data);
    //     return productAdded
    // }
}
