import mongoose from 'mongoose';
import byCript from "bcrypt"
import config from '../../../config';

mongoose.set('strictQuery', false);

interface usuario {
    gmail: string;
    password: string;
    username: String;
    age:number;
    phoneNumber:number;
    image:string;
}

export default class DaoMongoDB {
    private collection
    private initDB
    constructor(collection, schema){
        this.collection = mongoose.model(collection, schema);
        this.initDB = mongoose.connect(config.MONGO_ATLAS_URL);
    }

    async initMongoDB() {
        return this.initDB;
    }

    async findById(id){
        const user= await this.collection.findById(id)
        return user
    }

    async find(username){
      const userfound = await  this.collection.find({username:username})
      return userfound
    }

    async logIn(username:string,password:string){
        const cadidatePassword = password
        const usersfound: usuario[] =await this.find(username)
        if(usersfound&&usersfound.length>0){
            for(let i=0;i<=usersfound.length;i++ ){
            const logUser = await byCript.compare(cadidatePassword, usersfound[i].password)
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
    async singUp(data){
        const newUser = this.collection(data);
        await newUser.save();
        return newUser
    }
}