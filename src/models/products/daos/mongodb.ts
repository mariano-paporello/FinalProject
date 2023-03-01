import mongoose, { Schema } from 'mongoose';
import config from '../../../config';
import { AddProductObject, ProductBaseClass, ProductObject } from '../products.interface';

mongoose.set('strictQuery', true);


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
        const productFound: ProductObject| null | undefined = await this.collection.findById(id)
        return productFound
    }
    async getProductByQuery(query:any){
        const productFound: ProductObject | undefined |null = await this.collection.findOne(query)
        return productFound
    }
    async postProductToProducts(data:AddProductObject): Promise<ProductObject>{
        const productAdded:any  =  await this.collection.create(data);
        return productAdded
    }
    async postProductToCart(data:AddProductObject ){
        const productAdding:any = await this.collection.create(data);
        return productAdding 
    }
    async deleteByQuery(query:any){
        const deleting = await this.collection.deleteOne(query)
        return deleting
    }
    async deleteAll(){
        await this.collection.deleteMany()
        return true
    }
}
