// import { asDto } from "./dto/products-dto";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { getDao } from "./products.factory";
import { AddProductObject } from "./products.interface";


 class ProductsRepository {
    private dao
    constructor() {
        this.dao = getDao();
    }

     async  getAllProd() {
        const products = await this.dao.getAllProd();
        const productsDto = (products)
        return productsDto
    };
    
     async  getProductById(id:string) {
        const products = await this.dao.getProductById(id);
        const productsDto = (products)
        return productsDto
    };
    
     async  getProductByQuery(query:any) {
        const products = await this.dao.getProductByQuery(query);
        const productsDto = (products)
        return productsDto
    };

    async postProductToProducts(data:AddProductObject){
        const products = await this.dao.postProductToProducts(data);
        return products
    }
    async deleteAll(){
        await this.dao.deleteAll()
        return true
    }
    async deleteByQuery(query:any){
        const productDeleted = await this.dao.deleteByQuery(query)
        return productDeleted
    }

    // GRAPHQL

    async postProductToProductsGraphql(title:"String", price:Number, thumbnail:"String", category:"String", stock:Number){
        const products = await this.dao.postProductToProductsGraphql({title, price, thumbnail, category, stock});
        return products
    }

}
export const repositoryProduct = new ProductsRepository();