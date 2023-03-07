import mongoose from "mongoose"
import byCript from "bcrypt"
import { UserObject } from "../user.interface";



const usersSchema = new mongoose.Schema<UserObject>(
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

export default usersSchema