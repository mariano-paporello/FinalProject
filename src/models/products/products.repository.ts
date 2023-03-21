// import { asDto } from "./dto/products-dto";
import { schemaComposer } from 'graphql-compose'; 
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
    
     async  getProductByQuery(query:unknown) {
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
    async deleteById(id:string){
        const productDeleted = await this.dao.deleteById(id)
        return productDeleted
    }

    // GRAPHQL

    // async postProductToProductsGraphql(title:String, price:Number, thumbnail:String, category:String, stock:Number){
    //     const products = await this.dao.postProductToProductsGraphql({title, price, thumbnail, category, stock});
    //     return products
    // }

}
export const repositoryProduct = new ProductsRepository();

// const ProductTC = schemaComposer.createObjectTC({
//   name: 'ProductObject',
//   fields: {
//     _id:"String!",
//     id:"String",
//     title:"String",
//     price:"Int",
//     thumbnail:"String",
//     category:"String",
//     stock:"Int",
//   },
// });

// const ProductInCartInputTC = schemaComposer.createInputTC({
//   name:"ProductInCartObjectInput",
//   fields:{
//     _id:"String",
//     amount:"Int",
//     productId:"String"
//   }
// })


// export const productsQuerys = {
//     getAllProd: {
//     type: '[ProductObject]',
//     resolve: async () => await repositoryProduct.getAllProd(),
//   },
//   getProductById: {
//     type: 'ProductObject',
//     args: { id: 'String!' },
//     resolve: async (_:unknown,  id:string ) => await repositoryProduct.getProductById(id),
//   },
//   getProductByTitle: {
//     type: "ProductObject",
//     args: {
//       titleProd: "String"
//     },
//     resolve:async (_:unknown, titleProd:string) => await repositoryProduct.getProductByQuery({title:titleProd})
//   }
// }
// export const productsMutations = {
//     postProductToProducts: {
//         type: 'ProductObject',
//         args: {
//           title:"String!",
//           price:"Int",
//           thumbnail:"String",
//           category:"String",
//           stock:"Int",
//         },
//         resolve: async (_:unknown,  title:String, price:Number, thumbnail:String, category:String, stock:Number) => await repositoryProduct.postProductToProductsGraphql(title, price, thumbnail, category, stock),
//       },
//       deleteById:{
//         type: 'DeleteResult',
//         args: {
//           id: "String"
//         },
//         resolve: async (_:unknown, id:string) => await repositoryProduct.deleteByQuery({_id: id})
//       },
//       deleteAll: {
//         type: "Boolean",
//         resolve: async () => await repositoryProduct.deleteAll
//       }
// }
