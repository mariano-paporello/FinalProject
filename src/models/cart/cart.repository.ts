import { schemaComposer } from 'graphql-compose'; 
import { getDao } from "./cart.factory";
import { CartArray, CreateCartObject, productInCartObject} from "./cart.interface"
// import { asDto } from "./dto/cart-dto";


 class cartRepository {
    private dao
    constructor() {
        this.dao = getDao();
    }

     async  getCartById(id:string) {
        const cart = await this.dao.getCartById(id);
        const cartDto = (cart)
        return cartDto
    };
    
     async  getCartByQuery(query:unknown) {
        const cart = await this.dao.getCartByQuery(query);
        const cartDto = (cart)
        return cartDto
    };
    
     async  createCart(data:CreateCartObject) {
        const cart = await this.dao.createCart(data);
        const cartDto = (cart)
        return cartDto
    };
    
     async  updateCart(query:unknown, update:unknown) {
        const cart = await this.dao.updateCart(query, update);
        const cartDto = (cart)
        return cartDto
    };

    // GRAPHQL
    // async  getCartByQueryGraphql(userId:string) {
    //     const cart = await this.dao.getCartByQuery({userId: userId});
    //     const cartDto = (cart)
    //     return cartDto
    // };
    // async createCartGraphql(userId:string, cart:productInCartObject[] | []){
    //     const data = {userId, cart}
    //     const cartCreated = await this.dao.createCart(data);
    //     return cartCreated
    // }
}
export const repositoryCart = new cartRepository();

// const ProductInCartTC = schemaComposer.createObjectTC({
//     name:"ProductInCartObject",
//     fields:{
//       _id:"String",
//       amount:"Int",
//       productId:"String"
//     }
//   })
//   const CartTC = schemaComposer.createObjectTC({
//     name:"CartObject",
//     fields:{
//       _id:"String",
//       userId:"String",
//       cart: "[ProductInCartObject]"
//     }
//   })

// export const cartQuerys = {
//     getCartById:{
//         type:"CartObject",
//         args: { id:"String"},
//         resolve:async (_:unknown, id:string) => await repositoryCart.getCartById(id)
//     },
//     getCartByQuery:{
//         type:"CartObject",
//         args: {userId: "String"},
//         resolve:async (_:unknown,userid:string) => await repositoryCart.getCartByQueryGraphql(userid)
//     }
// }
// export const cartMutations = {
//     createCart:{
//         type: "CartObject",
//         args: {userId: "String",cart:"[ProductInCartObjectInput]"},
//         resolve: async (_:unknown, userId:string, cart:productInCartObject[])=> await repositoryCart.createCartGraphql(userId,cart)
//     }
// }
