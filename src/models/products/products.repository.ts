
import { asDto } from "./dto/products-dto";
import { getDao } from "./products.factory";


 class ProductsRepository {
    private dao
    constructor() {
        this.dao = getDao();
    }

     async  getAllProd() {
        const products = await this.getAllProd();
        const productsDto = asDto(products)
        return productsDto
    };
    
     async  getProductById(id) {
        const products = await this.getProductById(id);
        const productsDto = asDto(products)
        return productsDto
    };
    
     async  getProductByQuery(query) {
        const products = await this.getProductByQuery(query);
        const productsDto = asDto(products)
        return productsDto
    };
    
     async  postProductToCart(data) {
        const products = await this.postProductToCart(data);
        const productsDto = asDto(products)
        return productsDto
    };

}
export const repositoryProduct = new ProductsRepository();