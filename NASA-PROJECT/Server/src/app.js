const express=require("express");
const cors=require("cors")
const planetsRouter = require("./routes/planets/planets-router");
const app=express();
//  Only for development
app.use(cors({
  origin: "*"  // Allows all origins
}));
app.use(express.json())
app.use(planetsRouter)
module.exports=app;
