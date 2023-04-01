import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { User } from "../../public/types";
import config from '../config/index';
import { logger } from "../utils/loggers";


export const createAuthToken = async (user:User)=> {
    const payload = {
      userId: user._id,
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
        if(authHeader){
        const token = authHeader && authHeader.split(' ')[1]
        if(!token ){
          return res.status(403).json({msg:"Not authorized"}) 
        }else if(!Array.isArray(token)){
          try{ 
          const tokenReturned = jwt.verify(token, config.JWT_SECRET_KEY, (err, user)=>{
              if(err){ 
                
                return false
              }else if(user){
                req.user = user 
                return user
              }
            }
          )
          if(typeof tokenReturned === "object"){
            next()
          }
          else{
            res.status(403).json({
              Error: "Expired token"
            })
          }
        }catch(err){
          logger.error(err)
          console.log(err)
          res.status(403).json({
            error: err
          })
        }
      }
    }else{
          res.status(403).json({
            Error: "not authorized"
         })
    }
  }catch(err){
    return res.status(403).json({msg:`Error: ${err} not authorized`})
  }
}
