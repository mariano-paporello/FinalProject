import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { User } from "../../Public/types";
import config from '../config/index';
import { repositoryUser } from '../models/users/user.repository';


export const createAuthToken = async (user:User)=> {
    const payload = {
      usedId: user._id,
      username: user.username,
      image: user.image,
      gmail: user.gmail
    };

    
    const token = jwt.sign(payload, config.TOKEN_SECRET, {expiresIn: "10m"});
    return token
  }

  export const checkAuth = async (req:Request,res:Response,next:NextFunction)=>{

      try{
        const token = req.headers["x-auth-token"] || req.headers['Access-Control-Expose-Headers'];
        console.log("EL TOKEN EN CHECKAUTH: ", token)
        if(!token){
          return res.status(401).json({msg:"NO AUTORIZADeee "}) 
        }else if(!Array.isArray(token)){
          /*const decode : any =*/ 
          jwt.verify(token, config.TOKEN_SECRET, (err, user)=>{
              if(err) return res.status(403)
              req.user = user
              next()
            }
          )
        // const user : any = await repositoryUser.findById(decode.userId) 
        // req.user = user
       
        // next()
      }
      }catch(err){
        
        return res.status(401).json({msg:' NO AUTORIZADO'})
      }
  }
