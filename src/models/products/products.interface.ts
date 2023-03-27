import mongoose, { FilterQuery, UpdateQuery } from "mongoose"
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

export type UpdateResult= {
    acknowledged : boolean
    matchedCount : number
    modifiedCount : number
}

export type DocumentForProductPost =  mongoose.Document<unknown, any, { [x: string]: any; }> & Omit<{ [x: string]: any; } & Required<{ _id: unknown; }>, never>


export interface DeleteResult{
    acknowledged:boolean
    deletedCount:number
}
export interface ProductBaseClass {
    getAllProd():Promise<ProductObject[] | [] >
    getProductById(id:string):Promise<ProductObject | DocumentMongoGet | undefined>
    getOneProductByQuery(query:FilterQuery<ProductObject>):Promise<ProductObject | DocumentMongoGet >
    getProductsByQuery(query:FilterQuery<ProductObject>):Promise<ProductObject[] >
    postProductToProducts(data:AddProductObject):Promise<ProductObject>
    updateProduct(query:FilterQuery<ProductObject>, update:UpdateQuery<ProductObject>): Promise<UpdateResult>
    deleteById(id:string):Promise<DeleteResult>
    deleteAll():Promise<boolean>
}
