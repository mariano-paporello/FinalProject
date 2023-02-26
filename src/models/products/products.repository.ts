// import { asDto } from "./dto/products-dto";
import { getDao } from "./products.factory";


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
    
     async  getProductById(id) {
        const products = await this.dao.getProductById(id);
        const productsDto = (products)
        return productsDto
    };
    
     async  getProductByQuery(query) {
        const products = await this.dao.getProductByQuery(query);
        const productsDto = (products)
        return productsDto
    };

    async postProductToProducts(data){
        const products = await this.dao.postProductToProducts(data);
        return products
    }
    
     async  postProductToCart(data) {
        const products = await this.dao.postProductToCart(data);
        const productsDto = (products)
        return productsDto
    };
    async deleteAll(){
        await this.dao.deleteAll()
        return true
    }
    async deleteByQuery(query){
        const productDeleted = await this.dao.deleteByQuery(query)
        return productDeleted
    }

}
export const repositoryProduct = new ProductsRepository();