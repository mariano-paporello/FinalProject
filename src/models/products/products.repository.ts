// import { asDto } from "./dto/products-dto";
import { FilterQuery, UpdateQuery } from 'mongoose';
import { getDao } from "./products.factory";
import { AddProductObject, ProductObject } from "./products.interface";


 class ProductsRepository {
    private dao
    constructor() {
        this.dao = getDao();
    }

     async  getAllProd() {
        const products = await this.dao.getAllProd();
        const productsDto = products
        return productsDto
    };
    
     async  getProductById(id:string) {
            const products = await this.dao.getProductById(id);
        const productsDto = (products)
        return productsDto
    };
    
     async  getProductByQuery(query:FilterQuery<ProductObject>) {
        const product = await this.dao.getOneProductByQuery(query);
        const productsDto = (product)
        return productsDto
    };
    async getProductsByQuery(query:FilterQuery<ProductObject>){
        const products = await this.dao.getProductsByQuery(query)
        return products
    }

    async postProductToProducts(data:AddProductObject){
        const products = await this.dao.postProductToProducts(data);
        return products
    }

    async updateProduct (query: FilterQuery<ProductObject>, update: UpdateQuery<ProductObject>){
        const result = await this.dao.updateProduct(query, update)
        return result
    }
    async deleteAll(){
        await this.dao.deleteAll()
        return true
    }
    async deleteById(id:string){
        const productDeleted = await this.dao.deleteById(id)
        return productDeleted
    }


}
export const repositoryProduct = new ProductsRepository();

