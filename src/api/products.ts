import { repositoryCart } from "../models/cart/cart.repository";
import { AddProductObject } from "../models/products/products.interface";
import { repositoryProduct } from "../models/products/products.repository";


export const findProduct = async (_id:string)=>{
    if(_id){
        const product = await repositoryProduct.getProductById(_id)
        return product
    }
}

export const getProducts = async()=>{
    return await repositoryProduct.getAllProd()
}

export const getCartByUserId= async (query:{userId:string})=>{
    return await repositoryCart.getCartByQuery(query)
}

export const updateCart = async (query:unknown, update:unknown)=>{
    return await repositoryCart.updateCart(query, update)
}

export const newProductToDB = async (data: AddProductObject )=>{
    return await repositoryProduct.postProductToProducts(data)
}