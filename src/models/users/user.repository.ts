// import { asDto } from "./dto/users-dto";
import { AddUserObject, UserBaseClass, UserObject } from "./user.interface";
import { getDao } from "./users.factory";



 class userRepository implements UserBaseClass{
    private dao
    constructor() {
        this.dao = getDao();
    }

     async findById(id:string){
        const user = await this.dao.findById(id);
        const userDto = (user)
        return userDto
    };
    
     async find(username:string): Promise<UserObject[] | null> {
        return await this.dao.find(username);
    };
    
     async logIn(username:string, password:string): Promise<UserObject| null |undefined>{
        const user = await this.dao.logIn(username, password);
        const userDto = (user);
        return userDto
    };
    
     async singUp(data:AddUserObject): Promise<UserObject>{
       const user = await this.dao.singUp(data);
       const userDto = (user)
       return userDto
    };
}

export const repositoryUser = new userRepository()
