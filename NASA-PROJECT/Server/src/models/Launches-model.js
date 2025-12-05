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
lauches.set(launch.flightNumber,launch);
function getAllLauches(){
    return Array.from(lauches.values())
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
module.exports={
   getAllLauches,
   addNewLaucnh
}