import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { User } from "../../Public/types";
import config from '../config/index';
import { logger } from "../utils/loggers";


export const createAuthToken = async (user:User)=> {
    const payload = {
      usedId: user._id,
      username: user.username,
      image: user.image,
      gmail: user.gmail
    };

    
    const token = jwt.sign(payload, config.JWT_SECRET_KEY, {expiresIn: config.TOKEN_KEEP_ALIVE});
    return token
  }

  export const checkAuth = async (req:Request,res:Response,next:NextFunction)=>{

      try{
        const authHeader = req.headers["authorization"];
        console.log("AAAAA", authHeader)
        if(authHeader){
        const token = authHeader && authHeader.split(' ')[1]
        console.log("CACACA DE TOKEN: ",token)
        if(!token){
          return res.status(401).json({msg:"NO AUTORIZADO "}) 
        }else if(!Array.isArray(token)){
          try{ 
          jwt.verify(token, config.JWT_SECRET_KEY, (err, user)=>{
              if(err) return res.status(403)
              req.user = user
              console.log("PASAMOS EL JWT ")
              next()
            }
          )
        }catch(err){
          logger.error(err)
          console.log(err)
          return res.status(401).json({
            err
          })
        }
      }
    }
      }catch(err){
        
        return res.status(401).json({msg:' NO AUTORIZADO'})
      }
  }
