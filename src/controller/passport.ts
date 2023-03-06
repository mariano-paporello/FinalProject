import { logger } from "../utils/loggers";
import { repositoryUser } from '../models/users/user.repository';
import { ifCartExist } from "./cart";
import { UserObject } from "../models/users/user.interface";
import { Request } from "express";


// CAMBIAR LA LOGICA PARA PODER PASARLO A CAPAS
export const searchUser= async(req:Request,password:string , username:string,  done:any)=>{
    try{
        console.log("DESDE PASSPORT USERNAME: ",username, " PASSWORD: ", password)
        const user:UserObject | null | undefined = await repositoryUser.logIn(username, password)
        if(user&&typeof user !== "boolean"){
            await ifCartExist(user)
            req.session.dataUser= user
            req.session.gmail= user.gmail;
            req.session.username= user.username;
            return done(null, user);
        }else if(typeof user === "boolean"){
        return done(null, false, {msg: "Usuario no encontrado debido a que dio false"})
    } 
    else {
        return done(null, false, {msg: "Usuario no encontrado debido a que dio undefined"})
    }
    }
    catch(err){
        logger.error("Error: ", err)
    }
    
  }
export const createUser = async( req:Request, password:string, username:string, done:any )=>{
    try {
        const {gmail, age, phoneNumber, image } = req.body
        // LOL
        const user:any = await repositoryUser.singUp({
            gmail, 
            password, 
            age, 
            phoneNumber,
            image,
            username
        })
        req.session.gmail =  user.gmail
        req.session.username= user.username
        await ifCartExist(user)
        return done(null,  user)
    } catch (err) {
        return done(null, false, { mensaje: 'Error Inesperado', err });
    }
}