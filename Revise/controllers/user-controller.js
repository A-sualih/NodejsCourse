const { v4: uuidv4 } = require("uuid");
const {validationResult}=require('express-validator');
const HttpError = require("../models/http-error");
const DUMMY_USERS=[
    {
        id:"AB",
        name:"Ahmed Sualih",
        email:"abumahi43@gmail.com",
        password:"Ahmed&Mahi388"
    }
]
const getusers=(req,res,next)=>{
    res.json({users:DUMMY_USERS})
}
const signup=(req,res,next)=>{
    const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new HttpError("Inalid inputs passed , please check your data", 422);
  }

    const {name,email,password}=req.body;
    const hasUser=DUMMY_USERS.find(u=>u.email===email)
    if(hasUser){
        throw new HttpError("could not create users ,email already exist");
    }
    const createdUser={
        id:uuidv4(),
        name,
        email,
        password
    }
    DUMMY_USERS.push(createdUser)
    res.status(201).json({users:createdUser})
}
const login=(req,res,next)=>{
    const {email,password}=req.body;
    const identifiedUser=DUMMY_USERS.find(u=>u.email===email);
    if(!identifiedUser || identifiedUser.password!==password){
        throw new HttpError("Could not identify user,credentials seem to be wrong",401);
    }
    res.json({meessage:"login sucessful"})
}
exports.getusers=getusers;
exports.signup=signup;
exports.login=login