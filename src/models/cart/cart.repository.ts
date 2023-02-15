import { getDao } from "./cart.factory";
import { asDto } from "./dto/cart-dto";


 class cartRepository {
    private dao
    constructor() {
        this.dao = getDao();
    }

     async  getCartById(id) {
        const cart = await this.getCartById(id);
        const cartDto = asDto(cart)
        return cartDto
    };
    
     async  getCartByQuery(query) {
        const cart = await this.getCartByQuery(query);
        const cartDto = asDto(cart)
        return cartDto
    };
    
     async  createCart(data) {
        const cart = await this.createCart(data);
        const cartDto = asDto(cart)
        return cartDto
    };
    
     async  updateCart(query, update) {
        const cart = await this.updateCart(query, update);
        const cartDto = asDto(cart)
        return cartDto
    };

}
export const repositoryCart = new cartRepository();