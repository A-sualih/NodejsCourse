const express = require("express");


const app = express();
const PORT = 3000;
app.use((req, res, next) => {
  console.log("Time", Date.now());
  next();
});
const users = [];
app.get("/users", (req, res) => {
  res.status(200).json({ 
    message: "Users retrieved successfully",
    users: users,
  });
});
app.get("/users/:pid", (req, res, next) => {
  const userId = Number(req.params.pid);
  const user = users[userId];
  if (user) {
    res.status(200).json(user);
  } else {
 
 return   res.status(404).json({message:" The route is not find"});
  }
  next();
});
app.use((req,res,next)=>{
  console.log(`${req.method} ${req.url}`)
  next()
})
app.use(express.json()); // Parse JSON bodies
// app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.post("/users", (req, res) => {
  const { users } = req.body;

  const createdPlace = users.map(user => ({
    id: user.id,
    name: user.name,
    livenow: user.livenow
  }));
  // ✅ Spread the array to push individual elements
  users.push(...createdPlace);
  res.status(201).json({ 
    message: "Users Created Successfully", 
    users: users // Return the updated array
  });
});
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
app.listen(PORT, () => {
  console.log(`listening on Port ${PORT}`);
});
