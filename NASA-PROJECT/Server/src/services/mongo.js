const mongoose=require("mongoose")
const MONGO_URL="mongodb+srv://nasa-api:YwDouzKCDZBDuugU@cluster0.2vsgkhg.mongodb.net/nasa?appName=Cluster0"
mongoose.connection.once("open",()=>{
    console.log("MongoDb connection Ready to go")
})
mongoose.connection.on("error",(err)=>{
console.error(err)
})


async function mongoConnect(params) {
    await    await mongoose.connect(MONGO_URL);
}
module.exports={
    mongoConnect,
}