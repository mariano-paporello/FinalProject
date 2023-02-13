import jwt from "jsonwebtoken"
import config from '../config/index';
import { usersModel } from "../models/user";


export const createAuthToken = async (user)=> {
    const payload= {
      usedId: user.id,
      username: user.username,
      image: user.image,
      gmail: user.gmail
    };
    console.log("🧙🧙🧙 Payload: ",payload) 
    const token = jwt.sign(payload, config.TOKEN_SECRET);
    return token
  }

  export const checkAuth = async (req,res,next)=>{

      try{
        const token = await req.headers['x-auth-token'];
        console.log("🌵🌵🌵", req.get('x-auth-token')) 
        if(!token){
          return res.status(401).json({msg:"NO AUTORIZADeee"}) 
        }
        const decode= jwt.verify(
          token,
          config.TOKEN_SECRET
        )
        // const user = await usersModel.findById(decode.userId)
        const user = 'pepe'
        req.user = user
        console.log("🧙 🧙 🧙 Todo piola ", req.user)
        next()
      }catch(err){
        console.log(err)
        return res.status(401).json({msg:' NO AUTORIZADO'})
      }
  }
