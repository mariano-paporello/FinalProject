import { logger } from "../utils/loggers"
import { repositoryCart } from "../models/cart/cart.repository"

export const getCartByQuery = async (query: unknown)=>{
    return await repositoryCart.getCartByQuery(query)
}

export const getCartByUserId= async (query:{userId:string})=>{
    return await repositoryCart.getCartByQuery(query)
}

export const updateCart = async (query:unknown, update:unknown)=>{
    return await repositoryCart.updateCart(query, update)
}
export const emptyCartCreator =async (id:string) => {
    try{
        const emptyCart =  await repositoryCart.createCart({userId:id,cart:[]})
        return  emptyCart
    }catch (error) {
        logger.error("Error: ", error)
    }
}
export const checkCart = async (id:string) =>{
    try {
   const cartFound = await  repositoryCart.getCartByQuery({userId: id})
   return cartFound
} catch (error) {
    logger.error("Error: ", error)
}
}
export const deleteCartProduct = async (idProduct: string, cuantity: number)=>{

}

