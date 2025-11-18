const bodyParser = require("body-parser");
const express = require("express");
const  placesRoutes=require('./routes/places-route');
const userRoutes=require("./routes/user-routes")
const HttpError = require("./models/http-error");
const app = express();
app.use(bodyParser.json())
app.use('/api/places',placesRoutes)
app.use('/api/users',userRoutes)
app.use((req,res,next)=>{
  const error=new HttpError("Could not find this route.",404);
  throw error;
})
app.use((Error,req,res,next)=>{
    if(res.headerSent){
        return next(Error)
    }
    res.status(Error.code || 500)
    res.json({message:Error.message || "An unkown error occured"})
})
app.listen(5000);