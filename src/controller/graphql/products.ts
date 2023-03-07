import { repositoryProduct } from "../../models/products/products.repository"


export const ProductsQueries = {
    getAllProd: repositoryProduct.getAllProd,
    getProductById: repositoryProduct.getProductById,
    getProductByQuery: repositoryProduct.getProductByQuery
}

export const ProductsMutations = {
    postProductToProducts: repositoryProduct.postProductToProducts,
    postProductToCart: repositoryProduct.postProductToCart,
    deleteAll: repositoryProduct.deleteAll,
    deleteByQuery: repositoryProduct.deleteByQuery,
}