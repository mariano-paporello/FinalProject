import mongoose from "mongoose"
import byCript from "bcrypt"


const Schema = mongoose.Schema
const collection = "users"
export interface usuario {
    gmail: string;
    password: string;
    username: String;
    age:number;
    phoneNumber:number;
    image:string;
}

const usersSchema = new Schema(
    {
    gmail: { type: String, require: true},
    password: { type: String, require: true, max: 100 },
    age: { type: String, require: true},
    username: { type: String, require: true},
    phoneNumber: { type: String, require: true, max:15},
    image: { type: String, require: true},
})

usersSchema.pre("save", async function(next){
    const user = this;
    const hash =await byCript.hash(user.password! , 10);
    this.password = hash
    next()
})

class UsersMongo{
    private users;
    

    constructor(){
        this.users = mongoose.model(collection, usersSchema)
    }
    async findById(id){
        const user= await this.users.findById(id)
        return user
    }

    async find(username){
      const userfound = await  this.users.find({username:username})
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
        const newUser = this.users(data);
        await newUser.save();
        console.log("TODOPERFECTO")
        return newUser
    }
    
}

export const usersModel= new UsersMongo()