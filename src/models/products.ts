import mongoose, { Collection } from "mongoose"

const collection= 'productos'

const productoSchema= new mongoose.Schema(
    {
        title: {type: String, require:true, max: 100},
        price: { type: Number, require: true},
        thumbnail: { type: String, require: true, max: 100 },
        stock: { type: Number, require: true},
        category: { type: String, require:false}

    },
    {timestamps: true}
)

interface data{
    title:string,
    price: number,
    thumbnail:string,
    stock:number,
    category:string
}
class ProductMongo {
    private product
    constructor(){
        this.product = mongoose.model(collection, productoSchema)
    }
    async getAllProd(){
        const products = await this.product.find({})
        return products
    }
    async getProductById(id:string){
        const productFound = await this.product.findById(id)
        return productFound
    }
    async getProductByQuery(query:any){
        const productFound = await this.product.findOne(query)
        return productFound
    }
    async postProductToCart(data:data){
        const productAdding = await this.product(data)
        await productAdding.save()
        return productAdding 
    }
}


export const  productoModel = new ProductMongo