// import { asDto } from "./dto/users-dto";
import { AddUserObject, UserBaseClass, UserObject } from "./user.interface";
import { getDao } from "./users.factory";
import { schemaComposer } from 'graphql-compose'; 



 class userRepository implements UserBaseClass{
    private dao
    constructor() {
        this.dao = getDao();
    }

     async findById(id:string): Promise<UserObject>{
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

const UserObjectTC = schemaComposer.createObjectTC({
    name: "UserObject",
    fields: {
        _id: "String",
        gmail: "String",
        password:"String",
        age:"String",
        username:"String",
        phoneNumber:"String",
        image:"String"
    }
  });
  const NewUserObjectInpTC = schemaComposer.createInputTC({
    name: "AddUserObject",
    fields: {
        gmail: "String",
        password:"String",
        age:"String",
        username:"String",
        phoneNumber:"String",
        image:"String"
    }
  });


export const usersQuerys= {
    findById:{
        type:"UserObject",
        args:{
            id:"String"
        },
        resolve:async (_:any,{id}:any) => {await repositoryUser.findById(id)}
    },
    find:{
        type:"[UserObject]",
        args:{
            username:"String"
        },
        resolve:async (_:any,{username}:any) => await repositoryUser.find(username)
    },
    logIn:{
        type:"UserObject",
        args:{
            username:"String",
            password:"String"
        },
        resolve:async (_:any, {username, password}:any) => await repositoryUser.logIn(username, password)
    }
}

export const usersMutations = {
    sigUp:{
        type:"UserObject",
        args: {
            data: "AddUserObject"
        },
        resolve:async (_:any, {data}:any) => await repositoryUser.singUp(data)
    }
}