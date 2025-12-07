const express=require("express");
const app=express();
const delay=(duration)=>{
const startTime=Date.now();
while(Date.now()-startTime <duration){

}
}
app.get('/',(req,res)=>{
    res.send("performance example");
})
app.get("/timer",(req,res,next)=>{
delay(9000)
res.send("Ding Ding Ding");
})
app.listen(3000);