import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { User } from "../../Public/types";
import config from '../config/index';
import { repositoryUser } from '../models/users/user.repository';


export const createAuthToken = async (user:User)=> {
    const payload= {
      usedId: user._id,
      username: user.username,
      image: user.image,
      gmail: user.gmail
    };
    
    const token = jwt.sign(payload, config.TOKEN_SECRET);
    return token
  }

  export const checkAuth = async (req:Request,res:Response,next:NextFunction)=>{

      try{
        const token = req.headers['x-auth-token'];

        if(!token){
          return res.status(401).json({msg:"NO AUTORIZADeee"}) 
        }else if(!Array.isArray(token)){
          const decode= jwt.verify(
            token,
            config.TOKEN_SECRET
          )
        }
        
        // const user = await repositoryUser.findById(decode.userId)
        const user = 'pepe'
        req.user = user
       
        next()
      }catch(err){
        
        return res.status(401).json({msg:' NO AUTORIZADO'})
      }
  }
