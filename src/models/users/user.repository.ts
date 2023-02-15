import { asDto } from "./users-dto";
import { getDao } from "./users.factory";




 class userRepository {
    private dao
    constructor() {
        this.dao = getDao();
    }

     async findById(id) {
        const user = await this.findById(id);
        const userDto = asDto(user)
        return userDto
    };
    
     async find(username) {
        return await this.find(username);
    };
    
     async logIn(username:string, password:string) {
        const user = await this.logIn(username, password);
        const userDto = asDto(user);
        return userDto
    };
    
     async singUp(data) {
       const user = await this.singUp(data);
       const userDto = asDto(user)
       return userDto
    };
}

export const repositoryUser = new userRepository()