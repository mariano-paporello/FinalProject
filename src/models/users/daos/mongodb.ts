import mongoose from 'mongoose';
import byCript from "bcrypt"
import config from '../../../config';
import { AddUserObject, UserBaseClass, UserObject } from '../user.interface';
import { usersSchema } from '../schema/users.schema';

mongoose.set('strictQuery', false);

export default class DaoMongoDB implements UserBaseClass {
    private collection
    private initDB
    constructor(collection:string, schema:usersSchema){
        this.collection = mongoose.model<UserObject>(collection, schema);
        this.initDB = mongoose.connect(config.MONGO_ATLAS_URL);
    }

    async initMongoDB() {
        return this.initDB;
    }

    async findById(id:string){
        const user= await this.collection.findById(id)
        return user
    }

    async find(usernameIngresed:string):Promise<UserObject[] | null>{
        console.log(usernameIngresed)
      const userfound = await this.collection.find({username: usernameIngresed}) 
      if(userfound.length === 0){
        return null
      }
      return userfound
    }

    async logIn(username: string,password: string){
        const candidatePassword = password
        const usersfound:UserObject[] | null = await this.find(username)
        if(usersfound != null &&usersfound.length>0 ){
            for(let i=0;i<=usersfound.length;i++ ){
            const logUser = await byCript.compare(candidatePassword, usersfound[i].password)
            if(logUser){
                
                return usersfound[i]
            }
            else{ 
                return null
            }}   
        }else{
            return null
        }
        
    }
    async singUp(data:AddUserObject){
        const newUser =  await this.collection.create(data);
        return newUser;
    }
}