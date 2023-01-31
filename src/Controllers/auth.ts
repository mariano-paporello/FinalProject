import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import config from '../config/index';
import  {usersModel, usuario}  from '../models/user';
import jwt from "jsonwebtoken"
import { createUser, searchUser } from './authenticationController';
import { logger } from '../middlewares/loggers';

// JWS PART
  export const generateAuthToken = (user)=>{
    const payload= {
      usedId: user.id,
      username: user.username,
      image: user.image,
      gmail: user.gmail
    };
    console.log("🧙🧙🧙 Payload: ",payload) 
    const token = jwt.sign(payload, config.TOKEN_SECRET, {expiresIn: '3m'});
    return token
  }

  export const checkAuth = async (req,res,next)=>{

      try{
        const token = req.headers['x-auth-token'];
        console.log("🌵🌵🌵", req.headers['x-auth-token']) 
        if(!token){
          return res.status(401).json({msg:"NO AUTORIZADO"}) 
        }
        const decode= jwt.veryify(
          token,
          config.TOKEN_SECRET
        )
        const user = await usersModel.findById(decode.userId)
        req.user = user
        console.log("🧙 🧙 🧙 Todo piola ", req.user)
        next()
      }catch(err){
        console.log(err)
        return res.status(401).json({msg:' NO AUTORIZADO'})
      }
  }

// PASSPORT PART
const strategyOptions = {
  password: "password",
  username: "username",
  passReqToCallback: true,
};

const logIn = async (req, username, password, done) => {
  try{
    searchUser(req, username, password, done)
  }catch(err){
    logger.error("Error: ",err)
  }
  
  };
  
  const signUp = async (req, username, password, done) => {
    createUser( req, username, password, done )
  };

export const loginFunc = new LocalStrategy(strategyOptions, logIn);
export const signUpFunc = new LocalStrategy(strategyOptions, signUp);

passport.serializeUser((user:any, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((userId, done) => {
    usersModel.findById(userId).then((user) => {
      return done(null, user);
    })
  });