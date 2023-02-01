import { logger } from "../../utils/loggers";
import { usersModel } from "../../models/user";

export const searchUser= async(req,username , password,  done)=>{
    try{
        const user = await usersModel.logIn(username, password)
        if(user){
            req.session.dataUser= user
            req.session.gmail= user.gmail;
            req.session.image= user.image
            req.session.contraseña= user.password;
            req.session.username= user.username;
            return done(null, user);
        }else{
        return done(null, false, {msg: "Usuario no encontrado"})
    } 
    }
    catch(err){
        logger.error("Error: ", err)
    }
    
  }
export const createUser = async( req, username, password, done )=>{
    try {
        const {gmail, age, phoneNumber, image } = req.body
        const user = await usersModel.singUp({
            gmail, 
            password, 
            age, 
            phoneNumber,
            image,
            username
        })

        req.session.image= user.image
        req.session.gmail =  user.gmail
        req.session.username= user.username
        req.session.contraseña= user.password
      
        return done(null,  user)
    } catch (err) {
        return done(null, false, { mensaje: 'Error Inesperado', err });
    }
}