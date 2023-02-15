import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { repositoryUser } from '../models/users/user.repository';
import { logger } from '../utils/loggers';
import { checkAuth, createAuthToken } from './jws';
import { createUser, searchUser } from './passport';

// JWT PART
export const generateToken = async(user)=>{
 return await createAuthToken(user)
}
export const validateToken = (req,res,next)=>{
  checkAuth(req, res, next)
}

// PASSPORT PART
const strategyOptions = {
  password: "password",
  username: "username",
  passReqToCallback: true,
};

const logIn = async (req, username, password, done) => {
  try{
    console.log("VAMOS A LOGEARR")
    searchUser(req, username, password, done)
  }catch(err){
    logger.error("Error: ",err)
  }
  
  };
  
  const signUp = async (req, username, password, done) => {
    try{
      createUser( req, username, password, done )
    }catch(err){
      logger.error("Error: ", err)
    }
    
  };

export const loginFunc = new LocalStrategy(strategyOptions, logIn);
export const signUpFunc = new LocalStrategy(strategyOptions, signUp);

passport.serializeUser((user:any, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((userId, done) => {
    repositoryUser.findById(userId).then((user) => {
      return done(null, user);
    })
  });