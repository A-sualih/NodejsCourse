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
    },
    target:{
        type:String,
       required:true
    },
    success:{
        type:Boolean,
        required:true,
        default:true
    },
    customer:[String],
    upcoming:{
        type:Boolean,
        required:true,
    }
})

module.exports=mongoose.model("Launch",lauchesSchema)