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

export interface UserBaseClass{
    findById(id:string):Promise<UserObject>
    find(username:string):Promise<UserObject[] | null>
    logIn(username:string,password:string):Promise<UserObject| null |undefined>
    singUp(data:AddUserObject):Promise<UserObject>
}