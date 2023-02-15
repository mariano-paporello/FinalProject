import { getDao } from "./cart.factory";
// import { asDto } from "./dto/cart-dto";


 class cartRepository {
    private dao
    constructor() {
        this.dao = getDao();
    }

     async  getCartById(id) {
        const cart = await this.dao.getCartById(id);
        const cartDto = (cart)
        return cartDto
    };
    
     async  getCartByQuery(query) {
        const cart = await this.dao.getCartByQuery(query);
        const cartDto = (cart)
        return cartDto
    };
    
     async  createCart(data) {
        const cart = await this.dao.createCart(data);
        const cartDto = (cart)
        return cartDto
    };
    
     async  updateCart(query, update) {
        const cart = await this.dao.updateCart(query, update);
        const cartDto = (cart)
        return cartDto
    };

}
export const repositoryCart = new cartRepository();