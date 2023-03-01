import mongoose from 'mongoose';
import byCript from "bcrypt"
import config from '../../../config';
import { AddUserObject, UserBaseClass, UserObject } from '../user.interface';

mongoose.set('strictQuery', false);

export default class DaoMongoDB implements UserBaseClass {
    private collection
    private initDB
    constructor(collection:any, schema:any){
        this.collection = mongoose.model(collection, schema);
        this.initDB = mongoose.connect(config.MONGO_ATLAS_URL);
    }

    async initMongoDB() {
        return this.initDB;
    }

    async findById(id:string):Promise<UserObject>{
        const user= await this.collection.findById(id)
        return user
    }

    async find(username:string): Promise<UserObject[]> {
      const userfound = await  this.collection.find({username:username})
      return userfound
    }

    async logIn(username:string,password:string):Promise<UserObject| false |undefined>{
        const candidatePassword = password
        const usersfound = await this.find(username)
        if(usersfound&&usersfound.length>0){
            for(let i=0;i<=usersfound.length;i++ ){
            const logUser = await byCript.compare(candidatePassword, usersfound[i].password)
            if(logUser){
                return usersfound[i]
            }
            else{ 
                return false
            }}   
        }else{
            return false
        }
        
    }
    async singUp(data:AddUserObject){
        const newUser:Promise<UserObject> =  await this.collection.create(data);
        return newUser;
    }
}