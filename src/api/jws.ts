import { NextFunction, Request, Response } from "express";
import jwt, { verify } from "jsonwebtoken"
import { User } from "../../Public/types";
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
          return res.status(401).json({msg:"NO AUTORIZADO "}) 
        }else if(!Array.isArray(token)){
          try{ 
            jwt.verify(token, config.JWT_SECRET_KEY, (err, user)=>{
              if(err){ 
                res.status(403).json({
                  Error: err
                })
                return err
              }else if(user){
                req.user = user
                next()
                return user
              }
            }
          )
        }catch(err){
          logger.error(err)
          console.log(err)
          res.status(401).json({
            error: err
          })
        }
      }
    }else{
          res.status(401).json({
            Error: "No estas autorizado"
         })
    }
  }catch(err){
    return res.status(401).json({msg:`Error: ${err} NO AUTORIZADO`})
  }
}
