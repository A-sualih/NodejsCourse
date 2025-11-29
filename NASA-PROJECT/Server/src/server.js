const app=require("./app")
const http=require('http');
const PORT = process.env.PORT || 8002

const server=http.createServer(app);
server.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}...`)
})


console.log("The Port is",PORT)