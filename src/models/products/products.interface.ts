export interface AddProductObject {
    title:string
    price:number
    thumbnail:string
    category:string
    stock:number
}
export interface ProductObject extends AddProductObject{
    _id:string
}
export interface ProductBaseClass {
    getAllProd():Promise<ProductObject[] | [] | undefined>
    getProductById(id:string):Promise<ProductObject | undefined |null>
    getProductByQuery(query:any):Promise<ProductObject | undefined |null>
    postProductToProducts(data:AddProductObject):Promise<ProductObject>
    postProductToCart(data:AddProductObject):Promise<ProductObject>
    deleteByQuery(query:any):Promise<any>
    deleteAll():Promise<boolean>
}