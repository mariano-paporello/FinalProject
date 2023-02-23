import jwt from "jsonwebtoken"
import config from '../config/index';
import { repositoryUser } from '../models/users/user.repository';


export const createAuthToken = async (user)=> {
    const payload= {
      usedId: user.id,
      username: user.username,
      image: user.image,
      gmail: user.gmail
    };
    
    const token = jwt.sign(payload, config.TOKEN_SECRET);
    return token
  }

  export const checkAuth = async (req,res,next)=>{

      try{
        const token = await req.headers['x-auth-token'];

        if(!token){
          return res.status(401).json({msg:"NO AUTORIZADeee"}) 
        }
        const decode= jwt.verify(
          token,
          config.TOKEN_SECRET
        )
        // const user = await repositoryUser.findById(decode.userId)
        const user = 'pepe'
        req.user = user
       
        next()
      }catch(err){
        
        return res.status(401).json({msg:' NO AUTORIZADO'})
      }
  }
