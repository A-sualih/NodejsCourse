const express = require("express");
const usersController=require("./Controller/userscontrollers")
const messageController=require('./Controller/messagescontroller')
const app = express();
const PORT = 3000;
app.use((req, res, next) => {
  console.log("Time", Date.now());
  next();
});
const users = [];
app.get("/users",usersController.getUsers);
app.get("/users/:pid",usersController.getuser);
app.use((req,res,next)=>{
  console.log(`${req.method} ${req.url}`)
  next()
})
app.use(express.json()); // Parse JSON bodies
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.post("/users",usersController.postUsers);
app.post("/user",(req,res,next)=>{
  if(!req.body.name){
    res.status(400).json({error:"MISSING Freind Name"})
  }
  const user={
    name:req.body.name,
    id:users.length
  }
  users.push(user)
  res.status(201).json({ 
    message: "User created successfully", 
    user: user 
  });
});
app.get("/message",messageController.getMessages)
app.post("/message",messageController.postMessages)
app.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`);
});
