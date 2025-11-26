const express=require("express");
const usersController=require('../Controller/userscontrollers')
const routers=express.Router()
routers.use((req,res,next)=>{
    console.log("Id address :",req.ip);
    next()
})
routers.get("/",usersController.getUsers);
routers.get("/:pid",usersController.getuser);
routers.post("/",usersController.postUsers);
module.exports=routers;