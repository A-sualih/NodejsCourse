const express=require("express");
const path=require("path");
const cors=require("cors")
const planetsRouter = require("./routes/planets/planets-router");
const app=express();
//  Only for development
app.use(cors({
  origin: "*"  // Allows all origins
}));
app.use(express.json())
app.use(express.static(path.join(__dirname,"..","public")))
app.use(planetsRouter)
app.get("/",(req,res)=>{
  res.sendFile(path.join(__dirname,"..","public","index.html"))
})
module.exports=app;
