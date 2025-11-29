const app=require("./app")
const http=require('http');
const {loadPlanetsData}=require("./models/planets-model")
const PORT = process.env.PORT ||5000

const server=http.createServer(app);
async function startServer() {
    await loadPlanetsData();
server.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}...`)
})

}
startServer()
console.log("The Port is",PORT)