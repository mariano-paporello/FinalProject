import passport from 'passport';
import { Strategy as LocalStrategy , IStrategyOptionsWithRequest} from 'passport-local';
import { repositoryUser } from '../models/users/user.repository';
import { logger } from '../utils/loggers';
import { checkAuth, createAuthToken } from './jws';
import { createUser, searchUser } from './passport';
import { Response, Request, NextFunction } from "express"
import {User} from "../../Public/types"


// JWT PART
export const generateToken = async(user:User)=>{
 return await createAuthToken(user)
}
export const validateToken = (req:Request, res:Response, next:NextFunction)=>{
  checkAuth(req, res, next)
}

// PASSPORT PART
const strategyOptions: IStrategyOptionsWithRequest = {
  usernameField: "password",
  passwordField: "username",
  passReqToCallback: true
};

const logIn = async (req:Request, username:string, password:string, done: any) => {
  try{
    searchUser(req, username, password, done)
  }catch(err){
    logger.error("Error: ",err)
  }
  
  };
  
  const signUp = async (req:Request, username:string, password:string, done: any) => {
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

  passport.deserializeUser((userId:string, done) => {
    repositoryUser.findById(userId).then((user) => {
      return done(null, user);
    })
  });