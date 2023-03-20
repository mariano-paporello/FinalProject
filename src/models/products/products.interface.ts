import mongoose from "mongoose"
export interface AddProductObject {
    title:string,
    price:number,
    thumbnail:string,
    category:string,
    stock:number,
}
export interface ProductObject extends AddProductObject{
    _id:string
    id?:string
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

export type DocumentForProductPost =  mongoose.Document<unknown, any, { [x: string]: any; }> & Omit<{ [x: string]: any; } & Required<{ _id: unknown; }>, never>


export interface DeleteResult{
    acknowledged:boolean
    deletedCount:number
}
export interface ProductBaseClass {
    getAllProd():Promise<ProductObject[] | [] >
    getProductById(id:string):Promise<ProductObject | DocumentMongoGet>
    getProductByQuery(query:unknown):Promise<ProductObject | DocumentMongoGet >
    postProductToProducts(data:AddProductObject):Promise<ProductObject>
    deleteByQuery(query:unknown):Promise<DeleteResult>
    deleteAll():Promise<boolean>
}
