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
export type DocumentCartMongoPost = mongoose.Document<unknown, any, {
    [x: string]: any;
}> & Omit<{
    [x: string]: any;
} & Required<{
    _id: unknown;
}>, never>
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
    getCartByQuery(query:unknown):Promise<CartObject | DocumentMongoGet >
    createCart(data:CreateCartObject):Promise<CartObject | DocumentCartMongoPost>
    updateCart(query:unknown, update:unknown):Promise<UpdateResult>
}
