const lauchesDatabase=require("./launches.mongo")
const planets=require("./Planets.mongo")
const lauches=new Map();
let latestFightNumber=100;
const launch={
    flightNumber:100,
    mission:"kepler Exploration X",
    rocket:"Explorer ISI",
    launchDate:new Date("December 27,2030"),
    target:"Kepler-442 b",
    customer:["ZTM","NASA"],
    upcoming:true,
    success:true,
}
saveLaunch(launch)
// lauches.set(launch.flightNumber,launch);
async function getAllLauches(){
   return  await lauchesDatabase.find({},{
        "_id":0,
        "__v":0
    })
}
async function saveLaunch(launch){
const planet=await planets.findOne({
    keplerName:launch.target
})
if(!planet){
    throw new Error("No matching planet");
}
await lauchesDatabase.updateOne({
    flightNumber:launch.flightNumber,
},launch,{
    upsert:true
})
}
function addNewLaucnh(launch){
    latestFightNumber++;
lauches.set(latestFightNumber,Object.assign(launch,{
    success:true,
    upcoming:true,
    customer:['Zero to Master',"NASA"],
    flightNumber:latestFightNumber,
}));
}
function existsLaunchWithId(launch){
return lauches.has(launch)
}
function abortLaunchById(launchId){
const aborted=lauches.get(launchId);
aborted.upcoming=false;
aborted.success=false;
return aborted;
}
module.exports={
   getAllLauches,
   addNewLaucnh,
   existsLaunchWithId,
   abortLaunchById
}