const lauchesDatabase=require("./launches.mongo")
const planets=require("./Planets.mongo")
const DEFAULT_FLIGHT_NUMBER=100;
const lauches=new Map();
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
await lauchesDatabase.findOneAndUpdate({
    flightNumber:launch.flightNumber,
},launch,{
    upsert:true
})
}
async function scheduleNewLaunch(launch){
   const newFlightNumber=await getLatestFlightNumber()+1
const newLaunch=Object.assign(launch,{
    success:true,
    upcoming:true,
    customer:['Zero to Matery',"NASA"],
    flightNumber:newFlightNumber,
})
await saveLaunch(newLaunch);
}
// function addNewLaucnh(launch){
//     latestFightNumber++;
// lauches.set(latestFightNumber,Object.assign(launch,{
//     success:true,
//     upcoming:true,
//     customer:['Zero to Master',"NASA"],
//     flightNumber:latestFightNumber,
// }));
// }
async function getLatestFlightNumber() {
    const latestLaunch=await lauchesDatabase
    .findOne()
    .sort('_flightNumber');
    if(!latestLaunch){
        return DEFAULT_FLIGHT_NUMBER
    }
    return latestLaunch.flightNumber;
}
async function existsLaunchWithId(launchId){
return await lauchesDatabase.findOne({
    flightNumber:launchId
})
}
async function abortLaunchById(launchId){
return await lauchesDatabase.updateOne({
    flightNumber:launchId
},{
    upcoming:false,
    success:false,
})
// const aborted=lauches.get(launchId);
// aborted.upcoming=false;
// aborted.success=false;
// return aborted;
}
module.exports={
   getAllLauches,
   scheduleNewLaunch,
   existsLaunchWithId,
   abortLaunchById
}