import mongoose, { Schema } from 'mongoose';
import config from '../../../config';

mongoose.set('strictQuery', true);

interface data{
    title:string,
    price: number,
    thumbnail:string,
    stock:number,
    category:string
}

export class DaoMongoDB {    
    private collection
    private initDB

    constructor(collection:string, schema:Schema){
        this.collection = mongoose.model(collection, schema);
        this.initDB = mongoose.connect(config.MONGO_ATLAS_URL, () => console.log("Connected to MongoDB"));
    }

    async initMongoDB() {
        return this.initDB;
    }

    async getAllProd(){
        const products = await this.collection.find({})
        return products
    }
    async getProductById(id:string){
        const productFound = await this.collection.findById(id)
        return productFound
    }
    async getProductByQuery(query:any){
        const productFound = await this.collection.findOne(query)
        return productFound
    }
    async postProductToCart(data:data ){
        const productAdding = await this.collection(data)
        await productAdding.save()
        return productAdding 
    }
}

