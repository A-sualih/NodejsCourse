const mongoose=require("mongoose");
const lauchesSchema=new mongoose.Schema({
    flightNumber:{
        type:Number,
        required:true
    },
    mission:{
        type:String,
        required:true
    },
    launchDate:{
        type:Date,
        required:true,
    },
    rocket:{
        type:String,
        required:true
    }
})