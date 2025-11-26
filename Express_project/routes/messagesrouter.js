const express=require("express");
const messageController=require("../Controller/messagescontroller")
const messageRouter=express.Router()
messageRouter.get("/",messageController.getMessages)
messageRouter.post("/",messageController.postMessages)
module.exports=messageRouter;
