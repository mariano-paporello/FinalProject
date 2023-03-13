import mongoose from "mongoose"
export interface AddUserObject {
    gmail: string
    password:string
    age:string
    username:string
    phoneNumber:string
    image:string
}

export interface UserObject extends AddUserObject{
    _id: string
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

export interface UserBaseClass{
    findById(id:string):Promise<UserObject | DocumentMongoGet>
    find(username:string):Promise<UserObject[] | null | DocumentMongoGet>
    logIn(username:string,password:string):Promise<UserObject| null |undefined>
    singUp(data:AddUserObject):Promise<UserObject | DocumentMongoGet>
}