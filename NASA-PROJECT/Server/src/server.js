const app=require("./app")
const http=require('http');
const mongoose=require("mongoose")
const {loadPlanetsData}=require("./models/planets-model")
const PORT = process.env.PORT ||5000
const MONGO_URL="mongodb+srv://nasa-api:YwDouzKCDZBDuugU@cluster0.2vsgkhg.mongodb.net/nasa?appName=Cluster0"
const server=http.createServer(app);
mongoose.connection.once("open",()=>{
    console.log("MongoDb connection Ready to go")
})
mongoose.connection.on("error",(err)=>{
console.error(err)
})
async function startServer() {
   await mongoose.connect(MONGO_URL);
    await loadPlanetsData();
server.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}...`)
})
}
startServer()
console.log("The Port is",PORT)