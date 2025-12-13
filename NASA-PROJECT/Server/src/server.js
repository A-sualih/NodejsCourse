const app=require("./app")
const http=require('http');
const {mongoConnect}=require("./services/mongo")
const {loadPlanetsData}=require("./models/planets-model")
const PORT = process.env.PORT ||5000
const MONGO_URL="mongodb+srv://nasa-api:YwDouzKCDZBDuugU@cluster0.2vsgkhg.mongodb.net/nasa?appName=Cluster0"
const server=http.createServer(app);

async function startServer() {
   await mongoConnect()
    await loadPlanetsData();
server.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}...`)
})
}
startServer()
console.log("The Port is",PORT)