import { schemaComposer } from 'graphql-compose';
import { repositoryProduct } from '../models/products/products.repository';

const ProductTC = schemaComposer.createObjectTC({
  name: 'ProductObject',
  fields: {
    _id:"String!",
    id:"String",
    title:"String",
    price:"Int",
    thumbnail:"String",
    category:"String",
    stock:"Int",
  },
});
const DeleteResult = schemaComposer.createObjectTC({
  name: "DeleteResult",
  fields: {
      acknowledged:"Boolean",
      deletedCount:"Int"
  }
});

schemaComposer.Query.addFields({
//? PODRIA PONER TODO ESTO ADENTRO DE UN OBJETO EN CADA REPOSITORY DE FORMA
//? INDEPENDIENTE ASI LO QUE LLEGA ACA SON VARIABLES CON ESTOS OBJETOS ADENTRO
  getAllProd: {
    type: '[ProductObject]',
    resolve: async () => await repositoryProduct.getAllProd(),
  },
  getProductById: {
    type: 'ProductObject',
    args: { id: 'String!' },
    resolve: async (_, { id }) => await repositoryProduct.getProductById(id),
  },
  getProductByTitle: {
    type: "ProductObject",
    args: {
      titleProd: "String"
    },
    resolve:async (_, {titleProd}) => await repositoryProduct.getProductByQuery({title:titleProd})
  }
});

schemaComposer.Mutation.addFields({
  //? LO MISMO ACÁ
  postProductToProducts: {
    type: 'ProductObject',
    args: {
      title:"String!",
      price:"Int",
      thumbnail:"String",
      category:"String",
      stock:"Int",
    },
    resolve: async (_, { title, price, thumbnail, category, stock}) => await repositoryProduct.postProductToProductsGraphql(title, price, thumbnail, category, stock),
  },
  deleteById:{
    type: 'DeleteResult',
    args: {
      id: "String"
    },
    resolve: async (_, {id}) => await repositoryProduct.deleteByQuery({_id: id})
  },
  deleteAll: {
    type: "Boolean",
    resolve: async () => await repositoryProduct.deleteAll
  }

})

export const schema = schemaComposer.buildSchema()