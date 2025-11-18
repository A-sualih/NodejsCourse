const express=require("express");

// const usersControllers=require("../controllers/user-controllers");
const usersControllers=require("../controllers/user-controller")
const router=express.Router();
router.get('/',usersControllers.getusers)

router.post('/signup',usersControllers.signup);
router.post('/login',usersControllers.login);

// if the creator property in aplace holds the user id thats part of the url it's pthe place which i
module.exports=router;