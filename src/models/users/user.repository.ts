// import { asDto } from "./dto/users-dto";
import { getDao } from "./users.factory";




 class userRepository {
    private dao
    constructor() {
        this.dao = getDao();
    }

     async findById(id) {
        const user = await this.dao.findById(id);
        const userDto = (user)
        return userDto
    };
    
     async find(username) {
        return await this.dao.find(username);
    };
    
     async logIn(username:string, password:string) {
        const user = await this.dao.logIn(username, password);
        const userDto = (user);
        return userDto
    };
    
     async singUp(data) {
       const user = await this.dao.singUp(data);
       const userDto = (user)
       return userDto
    };
}

export const repositoryUser = new userRepository()