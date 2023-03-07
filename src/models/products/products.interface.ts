import mongoose from "mongoose"
export interface AddProductObject {
    title:"String",
    price:Number,
    thumbnail:"String",
    category:"String",
    stock:Number,
}
export interface ProductObject extends AddProductObject{
    _id:"String"
    id?:"String"
}
export type DocumentMongoGet = (mongoose.Document<unknown, any, {
    [x: string]: any;
}> & {
    [x: string]: any;
} & Required<{
    _id: unknown;
}>) | null

export type DocumentMongoPost = mongoose.Document<unknown, any, {
    [x: string]: any;
}> & {
    [x: string]: any;
} & Required<{
    _id: unknown;
}>

export interface DeleteResult{
    acknowledged:boolean
    deletedCount:number
}
export interface ProductBaseClass {
    getAllProd():Promise<ProductObject[] | [] >
    getProductById(id:string):Promise<ProductObject | DocumentMongoGet>
    getProductByQuery(query:any):Promise<ProductObject | DocumentMongoGet >
    postProductToProducts(data:AddProductObject):Promise<ProductObject| DocumentMongoPost>
    deleteByQuery(query:any):Promise<DeleteResult>
    deleteAll():Promise<boolean>
}
