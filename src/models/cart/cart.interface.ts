import mongoose from "mongoose"
export interface CreateCartObject extends CartArray{
    userId:string
}
export interface CartArray{
    cart: productInCartObject[] | []
}
export interface productInCartObject{
    _id:string
    amount:number
    productId:string
}
export interface CartObject extends CreateCartObject{
    _id:string
}
export type DocumentMongoPost = mongoose.Document<unknown, any, {
    [x: string]: any;
}> & {
    [x: string]: any;
} & Required<{
    _id: unknown;
}>
export type DocumentMongoGet = (mongoose.Document<unknown, any, {
    [x: string]: any;
}> & {
    [x: string]: any;
} & Required<{
    _id: unknown;
}>) | null
export type UpdateResult= {
    acknowledged : boolean
    matchedCount : number
    modifiedCount : number
}

export interface BaseCartClass {
    getCartById(id:string):Promise<CartObject | DocumentMongoGet>
    getCartByQuery(query:any):Promise<CartObject | DocumentMongoGet >
    createCart(data:CreateCartObject):Promise<CartObject |DocumentMongoPost>
    updateCart(query:any, update:any):Promise<UpdateResult>
}
