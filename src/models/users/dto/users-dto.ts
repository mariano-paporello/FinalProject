import { UserObject } from "../user.interface"

 class usersDTO {
    private gmail
    private username
    private password
    private image
    private age
    private id:string
    private phoneNumber 
    constructor(user:UserObject) {
        this.id = user._id
        this.gmail = user.gmail
        this.username = user.username
        this.password= user.password
        this.age= user.age
        this.image = user.image
        this.phoneNumber = user.phoneNumber
    }
}

export function asDto(users:UserObject[] | UserObject) {
    if(Array.isArray(users)){
        const newUsers:any = users.map((element:UserObject) => new usersDTO(element))
        return newUsers
    }
    else{
        const user:any =  new usersDTO(users)
        return user
    }
         
}